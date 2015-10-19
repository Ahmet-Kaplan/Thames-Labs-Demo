module.exports = function() {

  this.When(/^I sign up with good details$/, function() {
    client.waitForExist('form#signUpForm', 2000);
    client.setValue('#company-name-field', 'Company Name');
    client.setValue('#name-field', 'test user');
    client.setValue('#email-field', 'test3@domain.com');
    client.setValue('#password-field', 'goodpassword');
    client.setValue('#confirm-password-field', 'goodpassword');
    client.submitForm('form#signUpForm');
  });

  this.When(/^I sign up with bad details$/, function() {
    client.waitForExist('form#signUpForm', 2000);
    client.setValue('#company-name-field', '');
    client.setValue('#name-field', '');
    client.setValue('#email-field', 'testdomaincom');
    client.setValue('#password-field', 'short');
    client.setValue('#confirm-password-field', 'notmatchingpassword');
    client.submitForm('form#signUpForm');
  });

  this.Then(/^I am signed up$/, function() {
    var userId = client
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'test3@domain.com', function(err, data) {
          done(data);
        });
      }).value;
    expect(userId).not.toBe(null);
  });

  this.Then(/^I am not signed up$/, function() {
    var userId = client
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'test3@domain.com', function(err, data) {
          done(data);
        });
      }).value;
    expect(userId).toBe(null);
  });
};
