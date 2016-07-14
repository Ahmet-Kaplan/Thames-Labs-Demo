module.exports = function() {

  this.Then(/^I should see the global custom field has been created$/, function() {
    browser.waitForExist('.custom-field-item');
    expect(browser.getText('.custom-field-item')).toContain("test custom field");
  });

};
