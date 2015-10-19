module.exports = function() {

  this.When(/^I create the user$/, function() {
    client.waitForExist('.modal', 2000);
    client.setValue('input[name=name]', 'New User');
    client.setValue('input[name=email]', 'newuser@domain.com');
    client.submitForm('#addNewUserForm');
  });

  this.Then(/^I should see a success toastr$/, function() {
    client.waitForExist('.toast-success', 5000);
  });

  this.Then(/^I should see the "([^"]*)" button$/, function(id) {
    client.waitForExist(id, 2000);
  });

  this.Then(/^I should not see the "([^"]*)" button$/, function(id) {
    expect(client.isExisting(id)).toEqual(false);
  });
};
