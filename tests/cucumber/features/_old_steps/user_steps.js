module.exports = function() {

  this.When(/^I create the user$/, function() {
    browser.waitForExist('.modal', 2000);
    browser.setValue('input[name=name]', 'New User');
    browser.setValue('input[name=email]', 'newuser@domain.com');
    browser.submitForm('#addNewUserForm');
  });
};
