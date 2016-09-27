module.exports = function() {

  this.When(/^I see a global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName) {
    browser.waitForExist(listName, 2000);
    expect(browser.getText('#glob-cust-field-display', 2000)).toContain(gfName);
  });

  this.Then(/^the global field should no longer be visible$/, function() {
    browser.waitForExist('#glob-cust-field-display', 2000, true);
  });

  this.Then(/^I see a field with the name "([^"]*)" in the custom field list$/, function(name) {
    browser.waitForExist('#entity-custom-fields', 2000);
    browser.waitForExist('#custom-field-container', 2000);
    expect(browser.getText('.custom-field-display-item', 2000)).toContain(name);
  });

  this.Given(/^a global custom field has been created with the name "([^"]*)"$/, function(name) {
    browser
      .executeAsync(function(innerName, done) {
        Meteor.call('customFields.addNewGlobal', innerName, 'text', innerName + ' Test', 'company', 1, Meteor.userId(), function() {
          done();
        });
      }, name);
  });
};
