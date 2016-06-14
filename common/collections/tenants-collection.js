Collections.tenants = Tenants = new Mongo.Collection('tenants');

Tenants.helpers({
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  }
});

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.tenants.filters = {
  user: {
    display: 'User:',
    prop: 'user',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    allowMultiple: false,
    displayValue: function(user) {
      if (user) {
        return user.profile.name;
      }
    }
  },
  plan: {
    display: 'Plan:',
    prop: 'plan',
    defaultOptions: function() {
      return ['Free', 'Free+', 'Pro'];
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(plan) {
      if (!plan) return false;
      return true;
    }
  },
  active: {
    display: 'Activity:',
    prop: 'active',
    defaultOptions: function() {
      return ['7 days', '14 days', '28 days'];
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(active) {
      if (!active) return false;
      return true;
    }
  }
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.tenants.index = TenantsIndex = new EasySearch.Index({
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

      if (options.search.props.plan) {
        var plan = options.search.props.plan;
        if (plan === 'Pro') {
          tenants = Tenants.find({
            plan: 'pro',
            'stripe.stripeSubs': {
              $exists: true
            }
          }).map(function(t) {
            return t._id;
          });
        }

        if (plan === 'Free+') {
          tenants = Tenants.find({
            plan: 'pro',
            'stripe.stripeSubs': {
              $exists: false
            }
          }).map(function(t) {
            return t._id;
          });
        }

        if (plan === 'Free') {
          tenants = Tenants.find({
            plan: 'free'
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
        var currentDate = new Date();
        var cutOffDate = new Date();
        var tenantIDs = [];

        if (active === '7 days') {
          cutOffDate.setDate(currentDate.getDate() - 7);
        } else if (active === '14 days') {
          cutOffDate.setDate(currentDate.getDate() - 14);
        } else if (active === '28 days') {
          cutOffDate.setDate(currentDate.getDate() - 28);
        }

        var users = Meteor.users.find({
          "profile.lastLogin": {
            $gte: cutOffDate,
            $lt: currentDate
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
  // var prevdoc = this.previous;
  // var key;
  // for (key in doc.settings) {
  //   if (doc.settings.hasOwnProperty(key)) {
  //     if (doc.settings[key] !== prevdoc.settings[key]) {
  //       console.log(doc.settings[key], prevdoc.settings[key])
  //       LogServerEvent(LogLevel.Verbose, "The value of " + key + " setting was updated", 'tenant', doc._id);
  //     }
  //   }
  // }
});

Tenants.after.remove(function(userId, doc) {
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  LogServerEvent(LogLevel.Verbose, "Tenant '" + doc.name + "' was deleted", 'tenant', doc._id);
});