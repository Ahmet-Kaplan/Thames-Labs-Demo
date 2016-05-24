module.exports = function() {
  this.Given(/^I am viewing the dashboard$/, function() {
    browser.click('a#menuLinkDashboard');
    expect(browser.getTitle()).toBe('Dashboard');
    expect(browser.getText('h1')).toContain('Dashboard');
  });
};
