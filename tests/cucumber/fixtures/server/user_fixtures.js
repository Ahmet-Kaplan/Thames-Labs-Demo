Meteor.methods({

  createTestTenant: function() {
    var tenantName = 'Acme Corp',
        PurchaseOrderPrefix = 'A',
        PurchaseOrderStartingValue = 1;

    Tenants.insert({
      name: tenantName,
      settings: {
        PurchaseOrderPrefix: PurchaseOrderPrefix,
        PurchaseOrderStartingValue: PurchaseOrderStartingValue
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

    var tenantId = Tenants.findOne({name: tenantName})._id;
    Partitioner.setUserGroup(userId, tenantId);
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
  },

  setPermission: function(permission, statement) {
    var userId = Meteor.users.findOne({})._id;
    if(statement) {
      Roles.addUsersToRoles(userId, permission);
    } else {
      Roles.removeUsersFromRoles(userId, permission);
    }
  },

  setPermissionForUsername: function(permission, username, statement) {
    var userId = Meteor.users.findOne({username: username})._id;
    if(statement) {
      Roles.addUsersToRoles(userId, permission);
    } else {
      Roles.removeUsersFromRoles(userId, permission);
    }
  },

  'checkUserHasPermission': function(username, permissionName) {
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

    var tenantId = Tenants.findOne({name: tenantName})._id;
    Partitioner.setUserGroup(userId, tenantId);
    Roles.setUserRoles(userId, []);
  },
});
