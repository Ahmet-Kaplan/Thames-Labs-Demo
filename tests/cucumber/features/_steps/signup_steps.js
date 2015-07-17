module.exports = function() {

  this.When(/^I sign up with good details$/, function(callback) {
    this.client
      .waitForExist('form#signUpForm', 2000)
      .setValue('#company-name-field', 'Company Name')
      .setValue('#name-field', 'test user')
      .setValue('#email-field', 'test3@domain.com')
      .setValue('#password-field', 'goodpassword')
      .setValue('#confirm-password-field', 'goodpassword')
      .submitForm('form#signUpForm')
      .call(callback);
  });

  this.When(/^I sign up with bad details$/, function(callback) {
    this.client
      .waitForExist('form#signUpForm', 2000)
      .setValue('#company-name-field', '')
      .setValue('#name-field', '')
      .setValue('#email-field', 'testdomaincom')
      .setValue('#password-field', 'short')
      .setValue('#confirm-password-field', 'notmatchingpassword')
      .submitForm('form#signUpForm')
      .call(callback);
  });

  this.Then(/^I should see a sign up error$/, function(callback) {
    call(callback);
  });

  this.Then(/^I am signed up$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'test3@domain.com', function(err, data) {
          console.log(data);
          done(data);
        });
      })
      .then(function(data) {
        expect(data).to.exist;
      })
      .call(callback);
  });

  this.Then(/^I am not signed up$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'testdomaincom', function(data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.not.exist;
      })
      .call(callback);
  });
};
