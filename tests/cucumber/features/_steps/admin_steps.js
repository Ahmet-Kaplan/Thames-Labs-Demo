module.exports = function() {

  this.When(/^I see a global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName) {
    browser.waitForExist(listName, 2000);
    expect(browser.getText('#custom-field-list', 2000)).toContain(gfName);
  });

  this.When(/^I click the button "([^"]*)"$/, function(button) {
    browser.leftClick(button);
  });

  this.Then(/^the global field should no longer be visible$/, function() {
    browser.waitForExist('#glob-cust-field-display', 2000, true);
  });

  this.Then(/^I see a field with the name "([^"]*)" in the custom field list$/, function(name) {
    browser.waitForExist('#entity-custom-fields', 2000);
    browser.waitForExist('#custom-field-container', 2000);
    expect(browser.getText('.custom-field-display-item', 2000)).toContain(name);
  });
  this.Given(/^an? global custom field field has been created$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('extInfo.addNewGlobal', 'GEI', 'Text', 'GEI Test', 'company', function() {
          done();
        });
      });
  });
}
