module.exports = function() {
  this.Then(/^I should see the sign in form$/, function() {
    expect(browser.getText('h3')).toContain('Sign In');
  });
};
