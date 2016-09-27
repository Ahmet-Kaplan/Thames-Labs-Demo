module.exports = function() {
  this.Then(/^I should see a list of purchase orders$/, function() {
    browser.waitForExist('#purchase-order-list', 2000);
    expect(browser.getText('h1')).toContain('Purchase Orders');
  });
};
