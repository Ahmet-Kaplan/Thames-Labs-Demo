Collections.purchaseorders = PurchaseOrders = new Mongo.Collection('purchaseorders');

Partitioner.partitionCollection(PurchaseOrders);

PurchaseOrders.helpers({
  supplierCompany: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  customerCompany: function() {
    return Companies.findOne(this.customerCompanyId);
  },
  activities: function() {
    var collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      purchaseOrderId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  supplierContact: function() {
    return Contacts.findOne(this.supplierContactId);
  },
  customerContact: function() {
    return Contacts.findOne(this.customerContactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  }
});

Tags.TagsMixin(PurchaseOrders);

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.purchaseorders.filters = {
  company: {
    display: 'Company:',
    prop: 'company',
    collectionName: 'companies',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'companyById',
    displayValue: function(company) {
      if (company) {
        return company.name;
      } else {
        return 'N/A';
      }
    }
  },
  contact: {
    display: 'Contact:',
    prop: 'contact',
    collectionName: 'contacts',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'contactById',
    displayValue: function(contact) {
      if (contact) {
        return contact.name();
      } else {
        return 'N/A';
      }
    }
  },
  status: {
    display: 'Status:',
    prop: 'status',
    verify: function(status) {
      if (Schemas.PurchaseOrder.schema().status.allowedValues.indexOf(status) !== -1) {
        return true;
      } else {
        return false;
      }
    },
    defaultOptions: function() {
      return Schemas.PurchaseOrder.schema('status').allowedValues;
    }
  },
  totalValueLower: {
    display: 'Total Price <',
    prop: 'totalValueLower',
    verify: function(value) {
      value = parseFloat(value)
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
  totalValueGreater: {
    display: 'Total Price >',
    prop: 'totalValueGreater',
    verify: function(value) {
      value = parseFloat(value)
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
  sequencedIdentifier: {
    display: 'RealTime Purchase Order Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'purchaseorders'
    },
    valueField: 'name',
    nameField: 'name'
  },
}

////////////////////
// SEARCH INDICES //
////////////////////

Collections.purchaseorders.index = PurchaseOrdersIndex = new EasySearch.Index({
  collection: PurchaseOrders,
  fields: ['description'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadPurchaseOrders']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'orderNumber': 1
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      return {
        'description': 1,
        'status': 1,
        'orderNumber': 1,
        'supplierCompanyId': 1,
        'supplierContactId': 1,
        'projectId': 1,
        'totalValue': 1,
        'tags': 1,
        'sequencedIdentifier': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.showClosed) {
        selector.status = {
          $in: ['Closed', 'Cancelled']
        };
      } else {
        selector.status = {
          $nin: ['Closed', 'Cancelled']
        };
      }

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = options.search.props.sequencedIdentifier;
      }

      if (options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.supplierCompanyId = {
          $in: options.search.props.company.split(',')
        };
      }

      if (options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.supplierContactId = {
          $in: options.search.props.contact.split(',')
        };
      }

      if (options.search.props.status) {
        // n.b. the array is passed as a comma separated string
        selector.status = {
          $in: options.search.props.status.split(',')
        };
      }

      if (options.search.props.totalValueLower || options.search.props.totalValueGreater) {
        selector.totalValue = {};
        var costLowerThan = parseFloat(options.search.props.totalValueLower);
        var costGreaterThan = parseFloat(options.search.props.totalValueGreater);

        if (!isNaN(costLowerThan)) {
          selector.totalValue.$lte = costLowerThan;
        }

        if (!isNaN(costGreaterThan)) {
          selector.totalValue.$gte = costGreaterThan;
        }
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      return selector;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////
PurchaseOrders.before.insert(function(userId, doc) {
  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    var tenant = Tenants.findOne({});
    doc.sequencedIdentifier = tenant.settings.purchaseorder.defaultPrefix + "" + tenant.settings.purchaseorder.defaultNumber;
  }
});

PurchaseOrders.after.insert(function(userId, doc) {
  logEvent('info', 'A new purchase order has been created: ' + doc.description);

  if (Meteor.isServer) {
    var t = Tenants.findOne({});
    Tenants.update({
      _id: t._id
    }, {
      $inc: {
        'settings.purchaseorder.defaultNumber': 1
      }
    });
  }
});

PurchaseOrders.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing purchase order has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description);
  }
  if (doc.userId !== this.previous.userId) {
    var prevUser = Meteor.users.findOne(this.previous.userId);
    var newUser = Meteor.users.findOne(doc.userId);
    logEvent('info', 'An existing purchase order has been updated: The value of "userId" was changed from ' + this.previous.userId + '(' + prevUser.profile.name + ") to " + doc.userId + ' (' + newUser.profile.name + ')');
  }
  if (doc.orderNumber !== this.previous.orderNumber) {
    logEvent('info', 'An existing purchase order has been updated: The value of "orderNumber" was changed from ' + this.previous.orderNumber + " to " + doc.orderNumber);
  }
  if (doc.supplierReference !== this.previous.supplierReference) {
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierReference" was changed from ' + this.previous.supplierReference + " to " + doc.supplierReference);
  }
  if (doc.status !== this.previous.status) {
    logEvent('info', 'An existing purchase order has been updated: The value of "status" was changed from ' + this.previous.status + " to " + doc.status);
  }
  if (doc.orderDate !== this.previous.orderDate) {
    logEvent('info', 'An existing purchase order has been updated: The value of "orderDate" was changed from ' + this.previous.orderDate + " to " + doc.orderDate);
  }
  if (doc.paymentMethod !== this.previous.paymentMethod) {
    logEvent('info', 'An existing purchase order has been updated: The value of "paymentMethod" was changed from ' + this.previous.paymentMethod + " to " + doc.paymentMethod);
  }
  if (doc.notes !== this.previous.notes) {
    logEvent('info', 'An existing purchase order has been updated: The value of "notes" was changed from ' + this.previous.notes + " to " + doc.notes);
  }
  if (doc.supplierCompanyId !== this.previous.supplierCompanyId) {
    var prevComp = Companies.findOne(this.previous.supplierCompanyId);
    var newComp = Companies.findOne(doc.supplierCompanyId);
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierCompanyId" was changed from ' + this.previous.supplierCompanyId + '(' + prevComp.name + ") to " + doc.supplierCompanyId + ' (' + newComp.name + ')');
  }
  if (doc.supplierContactId !== this.previous.supplierContactId) {
    var prevCont = Contacts.findOne(this.previous.supplierContactId);
    var newCont = Contacts.findOne(doc.supplierContactId);
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierContactId" was changed from ' + this.previous.supplierContactId + '(' + prevCont.forename + " " + prevCont.surname + ") to " + doc.supplierContactId + ' (' + newCont.forename + " " + newCont.surname + ')');
  }
  if (doc.projectId !== this.previous.projectId) {
    var prevProj = Projects.findOne(this.previous.projectId);
    var newProj = Projects.findOne(doc.projectId);
    logEvent('info', 'An existing purchase order has been updated: The value of "projectId" was changed from ' + this.previous.projectId + '(' + prevProj.description + ") to " + doc.projectId + ' (' + newProj.description + ')');
  }
});

PurchaseOrders.after.remove(function(userId, doc) {
  if (ServerSession.get('deletingTenant') === true) return;
  
  logEvent('info', 'A purchase order has been deleted: ' + doc.description);
});
