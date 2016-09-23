Meteor.methods({
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
  checkUserHasPermission: function(username, permissionName) {
    var user = Meteor.users.findOne({
      username: username
    });
    return Roles.userIsInRole(user, permissionName);
  },
  createTestRestrictedUser: function() {
    var tenantName = 'Acme Corp';
    const { Tenants } = require('/imports/api/collections.js');

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
    const { Tenants } = require('/imports/api/collections.js');
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({
      _id: tenantId
    });
    var stripeId = theTenant.stripe.stripeId;
    var Stripe = StripeAPI(process.env.STRIPE_SK);

    if (stripeId) {
      Stripe.customers.del(stripeId);
    }
  }
});
