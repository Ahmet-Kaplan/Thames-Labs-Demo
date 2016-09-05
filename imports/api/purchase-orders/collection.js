import { PurchaseOrderFilters } from './filters.js';
import { PurchaseOrderSchema } from './schema.js';
import { Activities, Companies, Contacts, Projects, Tenants } from '/imports/api/collections.js';

export const PurchaseOrders = new Mongo.Collection('purchaseorders');

PurchaseOrders.attachSchema(PurchaseOrderSchema);

Partitioner.partitionCollection(PurchaseOrders);

Tags.TagsMixin(PurchaseOrders);

PurchaseOrders.permit(['insert']).ifLoggedIn().ifHasRole('CanCreatePurchaseOrders').apply();
PurchaseOrders.permit(['update']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrders.permit(['remove']).ifLoggedIn().ifHasRole('CanDeletePurchaseOrders').apply();
PurchaseOrders.allowTags(function(userId) {
  return !!userId;
});

PurchaseOrders.helpers({
  supplierCompany: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  customerCompany: function() {
    return Companies.findOne(this.customerCompanyId);
  },
  activities: function() {
    const collectionsToFilter = getDisallowedPermissions(Meteor.userId());

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

PurchaseOrders.filters = PurchaseOrderFilters;

////////////////////
// SEARCH INDICES //
////////////////////

PurchaseOrders.index = new EasySearch.Index({
  collection: PurchaseOrders,
  fields: ['description'],
  permission: function(options) {
    const userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadPurchaseOrders']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'orderNumber': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
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
      };
    },
    selector: function(searchObject, options, aggregation) {
      const selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
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

      if (options.search.props.active) {
        // n.b. the array is passed as a comma separated string
        if(options.search.props.active === "Yes") {
          selector.status = {
            $nin: ['Closed', 'Cancelled']
          };
        } else {
          selector.status = {
            $in: ['Closed', 'Cancelled']
          };
        }
      }

      if (options.search.props.status) {
        // n.b. the array is passed as a comma separated string
        selector.status = {
          $in: options.search.props.status.split(',')
        };
      }

      if (options.search.props.totalValueLower || options.search.props.totalValueGreater) {
        selector.totalValue = {};
        const costLowerThan = parseFloat(options.search.props.totalValueLower);
        const costGreaterThan = parseFloat(options.search.props.totalValueGreater);

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
    const tenant = Tenants.findOne({
      _id: doc._groupId
    });
    doc.sequencedIdentifier = `${tenant.settings.purchaseorder.defaultPrefix}${tenant.settings.purchaseorder.defaultNumber}`;
  }
});

PurchaseOrders.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  const user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    LogClientEvent(LogLevel.Info, `${user.profile.name} created a new purchase order`, 'purchaseOrder', doc._id);
  }

  if (Meteor.isServer) {
    if (doc._groupId) {
      Tenants.update({
        _id: doc._groupId
      }, {
        $inc: {
          'settings.purchaseorder.defaultNumber': 1
        }
      }, function(err) {
        if (err) {
          LogServerEvent(LogLevel.Error, `An error occurred whilst updating the tenant's RealTime ID purchase order value: ${err}`, 'tenant', doc._groupId);
          return;
        }
      });
    }
  }
});

PurchaseOrders.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  const user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    if (doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's description", 'purchaseOrder', doc._id);
    }
    if (doc.supplierReference !== this.previous.supplierReference) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's supplier reference", 'purchaseOrder', doc._id);
    }
    if (doc.status !== this.previous.status) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's status", 'purchaseOrder', doc._id);

      if (Meteor.isServer && _.includes(["Approved", "Rejected"], doc.status)) {
        Meteor.call('addPoNotification', doc._id, doc.status);
      }
    }
    if (doc.paymentMethod !== this.previous.paymentMethod) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's payment method", 'purchaseOrder', doc._id);
    }
    if (doc.notes !== this.previous.notes) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's notes", 'purchaseOrder', doc._id);
    }
    if (doc.supplierCompanyId !== this.previous.supplierCompanyId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's supplier company", 'purchaseOrder', doc._id);
    }
    if (doc.supplierContactId !== this.previous.supplierContactId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's supplier contact", 'purchaseOrder', doc._id);
    }
    if (doc.projectId !== this.previous.projectId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order's project", 'purchaseOrder', doc._id);
    }
  }
});

PurchaseOrders.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  const user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted purchase order '" + doc.description + "'", 'purchaseOrder', doc._id);
  }
});