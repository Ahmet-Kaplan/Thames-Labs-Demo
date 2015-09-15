module.exports = function() {

  this.When(/^I see a global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName, callback) {
    this.client
      .waitForExist(listName, 2000)
      .getText('#glob-cust-field-display', 2000).then(function(text) {
        expect(text).to.contain(gfName);
      })
      .call(callback);
  });

  this.When(/^I click the button "([^"]*)"$/, function(button, callback) {
    this.client
      .leftClick(button)
      .call(callback);
  });

  this.Then(/^the global field should no longer be visible$/, function(callback) {
    this.client
      .waitForVisible('#glob-cust-field-display', 2000, true)
      .call(callback);
  });

  this.Then(/^I see a field with the name "([^"]*)" in the extended information list$/, function(name, callback) {
    this.client
      .waitForVisible('#entity-custom-fields', 2000)
      .waitForVisible('#global-fields', 2000)
      .getText('.custom-field-display-item', 2000).then(function(text) {
        expect(text).to.contain(name);
      })
      .call(callback);
  });
};
