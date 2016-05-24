module.exports = function() {
  this.When(/^I open the user menu$/, function() {
    browser.safeClick('#general-dropdown');
    expect(browser.isVisible('.dropdown.open .dropdown-menu')).toBe(true);
  });
};
