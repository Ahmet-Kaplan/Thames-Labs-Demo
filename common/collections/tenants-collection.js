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
      return ['Free', 'Free+', 'Pro']
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(plan) {
      if (!plan) return false;
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
    sort: () => {
      return {
        'name': 1
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      return {
        'name': 1,
        'settings': 1,
        'plan': 1,
        'stripe': 1
      }
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
  logEvent('info', 'A new tenant has been created: ' + doc.name);
});

Tenants.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing tenant has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  var prevdoc = this.previous;
  var key;
  for (key in doc.settings) {
    if (doc.settings.hasOwnProperty(key)) {
      if (doc.settings[key] !== prevdoc.settings[key]) {
        logEvent('info', 'An existing tenant has been updated: The value of tenant setting "' + key + '" was changed from ' + prevdoc.settings[key] + " to " + doc.settings[key]);
      }
    }
  }
});

Tenants.after.remove(function(userId, doc) {
  logEvent('info', 'A tenant has been deleted: ' + doc.name);
});