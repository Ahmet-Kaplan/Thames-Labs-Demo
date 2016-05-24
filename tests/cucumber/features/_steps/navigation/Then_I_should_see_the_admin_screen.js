module.exports = function() {

  this.Then(/^I should see the admin screen$/, function() {
    expect(browser.getTitle()).toBe('Administration');
    expect(browser.getText('h1')).toBe('Administration');
  });

};
