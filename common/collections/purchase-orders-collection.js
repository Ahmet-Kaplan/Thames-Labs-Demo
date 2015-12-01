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
    var collectionsToFilter = GetDisallowedPermissions(Meteor.userId());

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

////////////////////
// SEARCH INDICES //
////////////////////

Collections.purchaseorders.index = PurchaseOrdersIndex = new EasySearch.Index({
  collection: PurchaseOrders,
  fields: ['description'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['Administrator', 'CanReadPurchaseOrders']);
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
        'projectId': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
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

PurchaseOrders.after.insert(function(userId, doc) {
  logEvent('info', 'A new purchase order has been created: ' + doc.description);
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
  logEvent('info', 'A purchase order has been deleted: ' + doc.description);
});
