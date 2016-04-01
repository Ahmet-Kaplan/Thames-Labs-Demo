module.exports = function() {
  this.Then(/^I should see the global custom field in the company details$/, function () {
    browser.waitForExist('#entity-custom-fields');
    browser.waitForExist('#custom-field-container');
    expect(browser.getText('.custom-field-display-item')).toContain("test custom field");
  });
};
