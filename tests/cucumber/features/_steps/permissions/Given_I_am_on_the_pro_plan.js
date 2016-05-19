module.exports = function() {

  this.Given(/^I am on the pro plan$/, function() {
    server.execute(function(tenantId) {
      Tenants.update(tenantId, {
        $set: {
          plan: 'pro'
        }
      });
    }, browser.tenantId());
  });

};
