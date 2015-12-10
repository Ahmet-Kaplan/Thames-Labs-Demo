Meteor.methods({

  createTestTenant: function() {
    var tenantName = 'Acme Corp',
      PurchaseOrderPrefix = 'A',
      PurchaseOrderStartingValue = 1;

    Tenants.insert({
      name: tenantName,
      settings: {
        PurchaseOrderPrefix: PurchaseOrderPrefix,
        PurchaseOrderStartingValue: PurchaseOrderStartingValue,
        extInfo: {
          company: [],
          contact: [],
          project: []
        },
        opportunity: {
          stages: []
        },
        project: {
          types: []
        }
      },
      stripe: {
        "totalRecords": 0,
        "paying": false,
        "blocked": false
      },
      createdAt: new Date()
    });
  },

  createSecondTenant: function() {
    var tenantName = 'Acme Corp Rivals',
      PurchaseOrderPrefix = 'A',
      PurchaseOrderStartingValue = 1;

    Tenants.insert({
      name: tenantName,
      settings: {
        PurchaseOrderPrefix: PurchaseOrderPrefix,
        PurchaseOrderStartingValue: PurchaseOrderStartingValue,
        extInfo: {
          company: [],
          contact: [],
          project: []
        },
        opportunity: {
          stages: []
        },
        project: {
          types: []
        }
      },
      stripe: {
        "totalRecords": 0,
        "paying": false,
        "blocked": false
      },
      createdAt: new Date()
    });
  },

  createTestUser: function() {
    var tenantName = 'Acme Corp';

    var userId = Accounts.createUser({
      username: "test user",
      email: "test@domain.com",
      password: "goodpassword",
      profile: {
        name: "test user"
      }
    });

    var tenantId = Tenants.findOne({
      name: tenantName
    })._id;
    Partitioner.setUserGroup(userId, tenantId);

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        "emails.0.verified": true
      }
    });
  },

  createSecondUser: function() {
    var tenantName = 'Acme Corp Rivals';

    var userId = Accounts.createUser({
      username: "test user two",
      email: "test2@domain.com",
      password: "goodpassword",
      profile: {
        name: "test user two"
      }
    });

    var tenantId = Tenants.findOne({
      name: tenantName
    })._id;
    Partitioner.setUserGroup(userId, tenantId);
  },

  removeWidgetAndFab: function() {
    Meteor.users.update({
      username: "test user"
    }, {
      $set: {
        "profile.welcomeTour": true,
        "profile.fab": true
      }
    });
  },

  showFab: function() {
    Meteor.users.update({
      username: "test user"
    }, {
      $set: {
        "profile.fab": false
      }
    });
  },

  createTestSuperAdmin: function() {
    var superadminId = Accounts.createUser({
      username: 'superadmin',
      email: 'admin@cambridgesoftware.co.uk',
      password: 'admin',
      profile: {
        name: 'superadmin'
      },
      // This is necessary for partitioner to work correctly
      admin: true
    });
    Roles.addUsersToRoles(superadminId, 'superadmin');

    Meteor.users.update({
      _id: superadminId
    }, {
      $set: {
        "emails.0.verified": true
      }
    });
  },

  setPermission: function(permission, statement) {
    var userId = Meteor.users.findOne({})._id;
    if (statement) {
      Roles.addUsersToRoles(userId, permission);
    } else {
      Roles.removeUsersFromRoles(userId, permission);
    }
  },

  setPermissionForUsername: function(permission, username, statement) {
    var userId = Meteor.users.findOne({
      username: username
    })._id;
    if (statement) {
      Roles.addUsersToRoles(userId, permission);
    } else {
      Roles.removeUsersFromRoles(userId, permission);
    }
  },

  checkUserHasPermission: function(username, permissionName) {
    var user = Meteor.users.findOne({
      username: username
    });
    return Roles.userIsInRole(user, permissionName);
  },

  createTestRestrictedUser: function() {
    var tenantName = 'Acme Corp';

    var userId = Accounts.createUser({
      username: "restricted user",
      email: "restricted@domain.com",
      password: "goodpassword",
      profile: {
        name: "restricted user"
      }
    });

    var tenantId = Tenants.findOne({
      name: tenantName
    })._id;
    Partitioner.setUserGroup(userId, tenantId);
    Roles.setUserRoles(userId, []);

    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        "emails.0.verified": true
      }
    });
  },

  getUserByEmail: function(email) {
    return Meteor.users.findOne({
      emails: {
        $elemMatch: {
          address: email
        }
      }
    });
  },

  deleteStripeTestCustomer: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({
      _id: tenantId
    });
    var stripeId = theTenant.stripe.stripeId;
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    if (stripeId) {
      Stripe.customers.del(stripeId);
      Tenants.direct.update({
        _id: tenantId
        }, {
        $unset: {
          'stripe.stripeId': '',
          'stripe.stripeSubs': ''
        }
      });
    }
  }
});
