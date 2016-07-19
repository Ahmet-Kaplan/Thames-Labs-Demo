module.exports = function() {
  this.Given(/^I am viewing the dashboard$/, function() {
    browser.click('a#menu-link-dashboard');
    expect(browser.getTitle()).toBe('Dashboard');
    expect(browser.getText('h1')).toContain('Dashboard');
  });
};
