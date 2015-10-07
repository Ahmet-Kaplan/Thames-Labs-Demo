module.exports = function() {

  this.When(/^I create the user$/, function() {
    client.waitForVisible('.modal', 2000);
    client.setValue('input[name=name]', 'New User');
    client.setValue('input[name=email]', 'newuser@domain.com');
    client.submitForm('#addNewUserForm');
  });

  this.Then(/^I should see a success toastr$/, function() {
    client.waitForVisible('.toast-success', 2000);
  });

  this.Then(/^I should see the "([^"]*)" button$/, function(id) {
    client.waitForVisible(id, 2000);
  });

  this.Then(/^I should not see the "([^"]*)" button$/, function(id) {
    client.waitForVisible(id, 5000, true);
  });
};
