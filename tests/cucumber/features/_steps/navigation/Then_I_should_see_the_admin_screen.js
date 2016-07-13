module.exports = function() {

  this.Then(/^I should see the admin screen$/, function() {
    expect(browser.getText('.entity-title')).toBe('Settings');
  });

};
