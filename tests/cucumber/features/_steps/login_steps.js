module.exports = function() {

  this.Given(/^I can see the login form$/, function() {
    client.waitForExist('form#at-pwd-form');
  });

  this.When(/^I can see the login form$/, function() {
    client.waitForExist('form#at-pwd-form');
  });

  this.When(/^I enter good credentials into the login form$/, function() {
    client.waitForExist('#at-pwd-form', 2000);
    client.setValue('#at-field-email', 'test@domain.com');
    client.setValue('#at-field-password', 'goodpassword');
    client.submitForm('form#at-pwd-form');
  });

  this.When(/^I enter bad credentials into the login form$/, function() {
    client.waitForExist('#at-pwd-form', 2000);
    client.setValue('#at-field-email', 'test@domain.com');
    client.setValue('#at-field-password', 'badpassword');
    client.submitForm('form#at-pwd-form');
  });

  this.Then(/^I am logged in$/, function() {
    client.waitForExist('#menuLinkDashboard', 2000)
    var userId = client
      .executeSync(function() {
        return Meteor.userId();
      }).value;
    expect(userId).not.toBe(null);
  });

  this.Then(/^I am not logged in$/, function() {
    var userId = client
      .executeSync(function() {
        return Meteor.userId();
      }).value;
    expect(userId).toBe(null);
  });
};
