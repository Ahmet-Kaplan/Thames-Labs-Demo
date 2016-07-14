module.exports = function() {
  this.Then(/^I should see the global custom field list is empty$/, function() {
    expect(browser.isExisting('.custom-field-item')).toEqual(false);
  });
};
