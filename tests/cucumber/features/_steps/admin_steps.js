module.exports = function() {

  this.When(/^I see a global field with the name "([^"]*)" in the list "([^"]*)"$/, function(gfName, listName) {
    client.waitForExist(listName, 2000);
    expect(client.getText('#glob-cust-field-display', 2000)).toContain(gfName);
  });

  this.When(/^I click the button "([^"]*)"$/, function(button) {
    client.leftClick(button);
  });

  this.Then(/^the global field should no longer be visible$/, function() {
    expect(client.isExisting('#glob-cust-field-display')).toEqual(false);
  });

  this.Then(/^I see a field with the name "([^"]*)" in the extended information list$/, function(name) {
    client.waitForExist('#entity-custom-fields', 2000);
    client.waitForExist('#global-fields', 2000);
    expect(client.getText('.custom-field-display-item', 2000)).toContain(name);
  });
};
