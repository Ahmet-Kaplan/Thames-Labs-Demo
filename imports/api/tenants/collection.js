import { TenantSchema } from './schema.js';
import { TenantFilters } from './schema.js';

export const Tenants = new Mongo.Collection('tenants');
Tenants.attachSchema(TenantSchema);

Tenants.helpers({
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  }
});
Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').onlyProps(['settings', 'name']).ifHasRole('Administrator').apply();

////////////////////
// SEARCH FILTERS //
////////////////////

Tenants.filters = TenantFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Tenants.index = new EasySearch.Index({
  collection: Tenants,
  fields: ['name'],
  permission: function(options) {
    return Roles.userIsInRole(options.userId, ['superadmin']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'name': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      return {
        'name': 1,
        'settings': 1,
        'plan': 1,
        'stripe': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      var tenants = [];

      if(options.search.props.toBeDeleted) {
        var flagged = options.search.props.toBeDeleted;
        if (flagged === 'Yes') {
          tenants = Tenants.find({
            'settings.toBeDeleted': true
          }).map(function(t) {
            return t._id;
          });
        } else {
          tenants = Tenants.find({
            'settings.toBeDeleted': {$ne: true}
          }).map(function(t) {
            return t._id;
          });
        }

        selector._id = {
          $in: tenants
        };
      }

      if (options.search.props.active) {
        var active = options.search.props.active;
        var currentDate = moment();
        var cutOffDate = null;
        var tenantIDs = [];

        if (active === '7 days') {
          cutOffDate = moment().subtract(7, 'day');
        } else if (active === '14 days') {
          cutOffDate = moment().subtract(14, 'day');
        } else if (active === '28 days') {
          cutOffDate = moment().subtract(28, 'day');
        }

        var users = Meteor.users.find({
          "profile.lastLogin": {
            $gte: cutOffDate.toDate(),
            $lt: currentDate.toDate()
          }
        }).fetch();

        _.each(users, function(user) {
          if (user.group) {
            var tenantId = user.group;
            if (tenantIDs.indexOf(tenantId) === -1) {
              tenantIDs.push(tenantId);
            }
          }
        });

        selector._id = {
          $in: tenantIDs
        };
      }

      if (options.search.props.user) {
        var userId = options.search.props.user;
        var user = Meteor.users.findOne({
          _id: userId
        });
        if (user) {
          var tenant = Tenants.findOne({
            _id: user.group
          });
          if (tenant) {
            selector._id = tenant._id;
          }
        }
      }

      return selector;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Tenants.before.insert(function(userId, doc) {
  if (!doc.settings) doc.settings = tenancyDefaultSettings;
  if (!doc.stripe) doc.stripe = {};

  doc.createdAt = new Date();
});

Tenants.after.insert(function(userId, doc) {
  LogServerEvent(LogLevel.Verbose, "A new tenant was created", 'tenant', doc._id);
});

Tenants.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.name !== this.previous.name) {
    LogServerEvent(LogLevel.Verbose, "A tenant's name was updated", 'tenant', doc._id);
  }
});

Tenants.after.remove(function(userId, doc) {
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  LogServerEvent(LogLevel.Verbose, "Tenant '" + doc.name + "' was deleted", 'tenant', doc._id);
});
