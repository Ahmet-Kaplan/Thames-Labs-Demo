module.exports = function() {
  this.Given(/^the second tenant has an? ([^"]*)$/, function(friendlyEntityName) {

    server.execute((EntityName) => {

      const { Tenants } = require('/imports/api/collections.js');
      const secondTenant = Tenants.findOne({
              name: "Acme Corp Rivals"
            }),
            secondTenantId = secondTenant._id,
            user = Accounts.findUserByEmail("test2@domain.com"),
            userId = user._id;
      Partitioner.bindGroup(secondTenantId, () => {
        Meteor.call('add' + EntityName, userId);
      });
    }, friendlyEntityName);
  });
};
