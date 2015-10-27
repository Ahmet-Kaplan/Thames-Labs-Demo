module.exports = function() {

  this.When(/^I see a global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName) {
    browser.waitForExist(listName, 2000);
    expect(browser.getText('#glob-cust-field-display', 2000)).toContain(gfName);
  });

  this.When(/^I click the button "([^"]*)"$/, function(button) {
    browser.leftClick(button);
  });

  this.Then(/^the global field should no longer be visible$/, function() {
    expect(browser.isExisting('#glob-cust-field-display')).toEqual(false);
  });

  this.Then(/^I see a field with the name "([^"]*)" in the extended information list$/, function(name) {
    browser.waitForExist('#entity-custom-fields', 2000);
    browser.waitForExist('#global-fields', 2000);
    expect(browser.getText('.custom-field-display-item', 2000)).toContain(name);
  });
};
