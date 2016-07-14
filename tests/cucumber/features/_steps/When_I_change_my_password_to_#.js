module.exports = function() {
  this.When(/^I change my password to "([^"]*)"$/, function(newpassword) {
    browser.safeClick('#general-dropdown');
    browser.safeClick('#settings');
    browser.setValue('#objOldPassword', 'goodpassword');
    browser.setValue('#objNewPassword', newpassword);
    browser.setValue('#objRepPassword', newpassword);
    browser.safeClick('#btnPasswordChange');
    browser.waitForToastr('success', 'Password changed successfully');
  });
};
