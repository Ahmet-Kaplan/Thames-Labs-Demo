module.exports = function() {
  this.Then(/^I should see the global custom field list is empty$/, function() {
    expect(browser.getText('#globalCustomFieldsPanel')).not.toContain('test custom field');
  });
};
