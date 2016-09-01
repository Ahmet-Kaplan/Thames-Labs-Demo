module.exports = function() {

  this.Given(/^I have "([^"]*)" free users$/, function(num) {
    const freeUsers = parseInt(num, 10);
    server.execute(function(tenantId, maxFreeUsers) {
      Tenants.update(tenantId, {
        $set: {
          'stripe.maxFreeUsers': maxFreeUsers
        }
      });
    }, browser.tenantId(), freeUsers);
  });

};
