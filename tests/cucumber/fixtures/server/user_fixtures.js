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
  }

});
