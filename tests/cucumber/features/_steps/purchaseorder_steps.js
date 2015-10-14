module.exports = function() {

  var url = require('url');

  this.Then(/^I should see a list of purchase orders$/, function() {
    client.waitForVisible('#purchase-order-list', 2000);
    expect(client.getText('h1')).toContain('Purchase Orders');
  });

  this.When(/^I navigate to a purchase order page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/purchaseorders'));
    client.waitForVisible('.purchase-order-item', 50000);
    client.click('.purchase-order-item');
  });

  this.When(/^I click "([^"]*)" and select the option "([^"]*)"$/, function(menu, option) {
    client.selectByVisibleText(menu, option);
  });

  this.Then(/^element "([^"]*)" should contain the text "([^"]*)"$/, function(element, desiredText) {
    client.waitForVisible(element, 2000);
    expect(client.getText(element, 2000)).toContain(desiredText);
  });
};
