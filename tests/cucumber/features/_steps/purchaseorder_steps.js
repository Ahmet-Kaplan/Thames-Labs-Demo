module.exports = function() {

  this.Then(/^I should see a list of purchase orders$/, function() {
    client.waitForExist('#purchase-order-list', 2000);
    expect(client.getText('h1')).toContain('Purchase Orders');
  });

  this.When(/^I click "([^"]*)" and select the option "([^"]*)"$/, function(menu, option) {
    client.selectByVisibleText(menu, option);
  });

  this.Then(/^element "([^"]*)" should contain the text "([^"]*)"$/, function(element, desiredText) {
    client.waitForExist(element, 2000);
    expect(client.getText(element, 2000)).toContain(desiredText);
  });
};
