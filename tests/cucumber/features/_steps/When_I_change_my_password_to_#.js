module.exports = function() {
  this.When(/^I change my password to "([^"]*)"$/, function(newpassword) {
    browser.click('#general-dropdown');
    browser.click('#btnChangePassword');
    browser.waitForModal();
    browser.setValue('#objOldPassword', 'goodpassword');
    browser.setValue('#objNewPassword', newpassword);
    browser.setValue('#objRepPassword', newpassword);
    browser.confirmModal();
    browser.waitForToastr('success', 'Password changed successfully');
  });
};
