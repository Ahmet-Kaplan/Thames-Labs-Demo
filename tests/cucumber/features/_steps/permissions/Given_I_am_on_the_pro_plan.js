module.exports = function() {

  this.Given(/^I am on the pro plan$/, function() {
    server.execute(function(tenantId) {
      const { Tenants } = require('/imports/api/collections.js');
      Tenants.update(tenantId, {
        $set: {
          plan: 'pro'
        }
      });
    }, browser.tenantId());
  });

};
