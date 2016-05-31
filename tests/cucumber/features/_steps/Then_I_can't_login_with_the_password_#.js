module.exports = function() {
  this.Then(/^I can't log in with the password "([^"]*)"$/, function(password) {
    expect(browser.isExisting('h3=Sign In')).toBe(true);
    expect(browser.userId()).toBe(null);
    browser.setValue('#at-field-email', 'test@domain.com');
    browser.setValue('#at-field-password', password);
    browser.click('#at-btn');
    browser.waitForExist('.at-error');
    expect(browser.userId()).toBe(null);
  });
};
