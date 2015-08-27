module.exports = function() {

  this.When(/^I create the user$/, function(callback) {
    this.client
      .waitForVisible('.modal', 2000)
      .setValue('input[name=name]', 'New User')
      .setValue('input[name=email]', 'newuser@domain.com')
      .submitForm('#addNewUserForm')
      .call(callback);
  });

  this.Then(/^I should see a success toastr$/, function(callback) {
    this.client
      .waitForVisible('.toast-success', 2000)
      .call(callback);
  });

  this.Then(/^I should see the "([^"]*)" button$/, function(id, callback) {
    this.client
      .waitForVisible(id, 2000)
      .isExisting(id).then(function(isExisting) {
        expect(isExisting).to.be.true;
      })
      .call(callback);
  });

  this.Then(/^I should not see the "([^"]*)" button$/, function(id, callback) {
    this.client
      .isExisting(id).then(function(isExisting) {
        expect(isExisting).to.be.false;
      })
      .call(callback);
  });
};
