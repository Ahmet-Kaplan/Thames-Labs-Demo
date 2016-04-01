module.exports = function() {

  this.Then(/^I should see the global custom field has been created$/, function() {
    browser.waitForExist('#custom-field-list');
    expect(browser.getText('#custom-field-list')).toContain("test custom field");
  });

};
