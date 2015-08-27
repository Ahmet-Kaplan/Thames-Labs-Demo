Meteor.methods({

  createTenantAndUser: function() {
    var tenantId = Tenants.insert({
      name: 'Acme Corp',
      settings: {
        PurchaseOrderPrefix: 'A',
        PurchaseOrderStartingValue: 1
      },
      createdAt: new Date()
    });

    var userId = Accounts.createUser({
      username: "test user",
      email: "test@domain.com",
      password: "goodpassword",
      profile: {
        name: "test user"
      }
    });

    Partitioner.setUserGroup(userId, tenantId);
  }

});
