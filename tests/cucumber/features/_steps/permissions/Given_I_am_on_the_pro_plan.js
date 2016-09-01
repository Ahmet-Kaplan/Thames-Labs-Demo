module.exports = function() {

  this.Given(/^I am on the pro plan$/, function() {
    server.execute(function(tenantId) {
      Tenants.update(tenantId, {
        $set: {
          'stripe.stripeId': 'cus_123',
          'stripe.stripeSubs': 'sub_123'
        }
      });
    }, browser.tenantId());
  });

};
