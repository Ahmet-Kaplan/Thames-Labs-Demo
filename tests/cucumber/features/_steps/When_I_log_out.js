module.exports = function() {
  this.When(/^I log out$/, function() {
    browser.safeClick('#general-dropdown');
    browser.click('#sign-out');
    browser.waitForExist('h3=Sign In');
  });
};
