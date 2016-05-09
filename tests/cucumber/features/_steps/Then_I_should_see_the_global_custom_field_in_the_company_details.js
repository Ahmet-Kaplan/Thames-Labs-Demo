module.exports = function() {
  this.Then(/^I should (see|not see) the global custom field in the company details$/, function(option) {
    browser.waitForExist('#entity-custom-fields');
    browser.waitForExist('#custom-field-container');
    browser.waitForExist('.custom-field-display-item');
    browser.waitForVisible('.custom-field-display-item');
    if (option === 'see') {
      expect(browser.getText('.custom-field-display-item')).toContain("test custom field");
    } else if (option === 'not see') {
      expect(browser.getText('.custom-field-display-item')).not.toContain("test custom field");
    }
  });
};
