module.exports = function() {

  this.Then(/^I should see a list of purchase orders$/, function(callback) {
    this.client
      .waitForExist('#purchase-order-list')
      .getText('h1', function(text) {
        expect(text).to.contain('Purchase Orders')
      })
      .call(callback);
  });

  this.When(/^I navigate to a purchase order page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/purchaseorders'))
      .waitForExist('.purchase-order-item', 2000)
      .click('.purchase-order-item')
      .call(callback);
  });
};
