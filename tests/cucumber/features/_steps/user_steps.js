module.exports = function() {

  this.When(/^I create the user$/, function() {
    browser.waitForExist('.modal', 2000);
    browser.setValue('input[name=name]', 'New User');
    browser.setValue('input[name=email]', 'newuser@domain.com');
    browser.submitForm('#addNewUserForm');
  });

  this.Then(/^I should see a success toastr$/, function() {
    browser.waitForExist('.toast-success', 5000);
  });

  this.Then(/^I should see the "([^"]*)" button$/, function(id) {
    browser.waitForExist(id, 2000);
  });

  this.Then(/^I should not see the "([^"]*)" button$/, function(id) {
    expect(browser.isExisting(id)).toEqual(false);
  });
};
