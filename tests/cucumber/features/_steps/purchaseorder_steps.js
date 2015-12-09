module.exports = function() {

    var url = require('url');

  //Reading
  this.When(/^I navigate to a purchase order page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/purchaseorders'));
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });

  this.Then(/^I should see a list of purchase orders$/, function() {
    browser.waitForExist('#purchase-order-list', 2000);
    expect(browser.getText('h1')).toContain('Purchase Orders');
  });

  this.When(/^I click "([^"]*)" and select the option "([^"]*)"$/, function(menu, option) {
    browser.selectByVisibleText(menu, option);
  });

  this.Then(/^element "([^"]*)" should contain the text "([^"]*)"$/, function(element, desiredText) {
    browser.waitForExist(element, 5000);
    browser.waitForVisible(element, 5000);
    var elements = browser.getText(element, 2000);
    if(typeof elements === 'object') {
      return elements.some(function(elt) {
        if(elt.search(/desiredText/)) return true;
      });
    } else {
      expect(elements).toContain(desiredText);
    }
  });
};
