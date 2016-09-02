module.exports = function() {

  this.Given(/^I have "([^"]*)" free users$/, function(num) {
    const freeUsers = parseInt(num, 10);
    server.execute(function(tenantId, maxFreeUsers) {
      const { Tenants } = require("/imports/api/collections.js");
      Tenants.update(tenantId, {
        $set: {
          'stripe.maxFreeUsers': maxFreeUsers
        }
      });
    }, browser.tenantId(), freeUsers);
  });

};
