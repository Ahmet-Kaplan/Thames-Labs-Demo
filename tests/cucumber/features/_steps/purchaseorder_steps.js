module.exports = function() {

  var url = require('url');

  this.Then(/^I should see a list of purchase orders$/, function(callback) {
    this.client
      .waitForVisible('#purchase-order-list', 2000)
      .getText('h1', function(text) {
        expect(text).to.contain('Purchase Orders')
      })
      .call(callback);
  });

  this.When(/^I navigate to a purchase order page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/purchaseorders'))
      .waitForVisible('.purchase-order-item', 50000)
      .click('.purchase-order-item')
      .call(callback);
  });

  this.When(/^I click "([^"]*)" and select the option "([^"]*)"$/, function(menu, option, callback) {
    this.client
      .selectByVisibleText(menu, option)
      .call(callback);
  });
};
