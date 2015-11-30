module.exports = function() {

  this.When(/^I sign up with good details$/, function() {
    browser.waitForExist('form#signUpForm', 2000);
    browser.setValue('#company-name-field', 'Company Name');
    browser.setValue('#name-field', 'test user');
    browser.setValue('#email-field', 'test3@domain.com');
    browser.submitForm('form#signUpForm');
  });

  this.When(/^I sign up with bad details$/, function() {
    browser.waitForExist('form#signUpForm', 2000);
    browser.setValue('#company-name-field', '');
    browser.setValue('#name-field', '');
    browser.setValue('#email-field', 'testdomaincom');
    browser.submitForm('form#signUpForm');
  });

  this.Then(/^I am signed up$/, function() {
    var userId = browser
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'test3@domain.com', function(err, data) {
          done(data);
        });
      }).value;
    expect(userId).not.toBe(null);
  });

  this.Then(/^I am not signed up$/, function() {
    var userId = browser
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'test3@domain.com', function(err, data) {
          done(data);
        });
      }).value;
    expect(userId).toBe(null);
  });
};
