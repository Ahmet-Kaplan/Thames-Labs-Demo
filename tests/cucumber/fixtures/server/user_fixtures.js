Meteor.methods({

  createTestTenant: function() {
    var tenantName = 'Acme Corp';

    Tenants.insert({
      name: tenantName,
      settings: {
        extInfo: {
          company: [],
          contact: [],
          project: [],
          product: []
        },
        activity: {
          defaultNumber: 1,
        },
        task: {
          defaultNumber: 1,
        },
        company: {
          defaultNumber: 1,
        },
        contact: {
          defaultNumber: 1,
        },
        opportunity: {
          defaultNumber: 1,
          stages: []
        },
        project: {
          defaultNumber: 1,
          types: []
        },
        purchaseorder: {
          defaultPrefix: "",
          defaultNumber: 1,
        },
        product: {
          defaultNumber: 1,
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

  createFreeTenant: function() {
    var tenantName = 'Acme Corp';

    Tenants.insert({
      name: tenantName,
      settings: {
        extInfo: {
          company: [],
          contact: [],
          project: [],
          product: []
        },
        activity: {
          defaultNumber: 1,
        },
        task: {
          defaultNumber: 1,
        },
        company: {
          defaultNumber: 1,
        },
        contact: {
          defaultNumber: 1,
        },
        opportunity: {
          defaultNumber: 1,
          stages: []
        },
        project: {
          defaultNumber: 1,
          types: []
        },
        purchaseorder: {
          defaultPrefix: "",
          defaultNumber: 1,
        },
        product: {
          defaultNumber: 1,
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

  setTenantToFreePlan: function() {
    var t = Tenants.findOne({
      name: 'Acme Corp'
    });

    Tenants.update({
      _id: t._id
    }, {
      $set: {
        'stripe.paying': false
      }
    });
    var users = Meteor.users.find({
      group: t._id
    }).fetch();

    _.each(users, function(user) {
      if (!Roles.userIsInRole(user._id, 'Administrator')) {
        Roles.addUsersToRoles(user._id, ["Administrator"]);
      }
      _.each(defaultPermissionsList, function(p) {
        if (!Roles.userIsInRole(user._id, p)) {
          Roles.addUsersToRoles(user._id, p);
        }
      })

    });
  },
  setTenantToProPlan: function() {
    var t = Tenants.findOne({
      name: 'Acme Corp'
    });

    Tenants.update({
      _id: t._id
    }, {
      $set: {
        'stripe.paying': true
      }
    });
  },
  setSecondTenantToProPlan: function() {
    var t = Tenants.findOne({
      name: 'Acme Corp Rivals'
    });

    Tenants.update({
      _id: t._id
    }, {
      $set: {
        'stripe.paying': true
      }
    });
  },

  createSecondTenant: function() {
    var tenantName = 'Acme Corp Rivals';

    Tenants.insert({
      name: tenantName,
      settings: {
        extInfo: {
          company: [],
          contact: [],
          project: [],
          product: []
        },
        activity: {
          defaultNumber: 1,
        },
        task: {
          defaultNumber: 1,
        },
        company: {
          defaultNumber: 1,
        },
        contact: {
          defaultNumber: 1,
        },
        opportunity: {
          defaultNumber: 1,
          stages: []
        },
        project: {
          defaultNumber: 1,
          types: []
        },
        purchaseorder: {
          defaultPrefix: "",
          defaultNumber: 1,
        },
        product: {
          defaultNumber: 1,
        }
      },
      stripe: {
        "totalRecords": 0,
        "paying": false,
        "blocked": false
      },
      createdAt: new Date()
    });

    console.log("2nd tenant created");
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

  //used for creating a user on the same tenant
  createAdditionalUser: function() {
    var tenantName = 'Acme Corp';

    var userId = Accounts.createUser({
      username: "test user 2",
      email: "test2@domain.com",
      password: "goodpassword",
      profile: {
        name: "test user 2"
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

  //used for partition tests
  createSecondUser: function() {
    var tenantName = 'Acme Corp Rivals';

    var userId = Accounts.createUser({
      username: "test user two",
      email: "testtwo@domain.com",
      password: "goodpassword",
      profile: {
        name: "test user two"
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

  removeWelcome: function(email) {
    Meteor.users.update({
      'emails.address': email
    }, {
      $set: {
        "profile.welcomeTour": true,
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
    return result = Meteor.users.findOne({
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