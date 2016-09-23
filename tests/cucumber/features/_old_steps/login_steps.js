module.exports = function() {

  this.Given(/^I can see the login form$/, function() {
    browser.waitForExist('form#at-pwd-form');
  });

  this.When(/^I enter good credentials into the login form$/, function() {
    browser.waitForExist('#at-pwd-form', 2000);
    browser.setValue('#at-field-email', 'test@domain.com');
    browser.setValue('#at-field-password', 'goodpassword');
    browser.submitForm('form#at-pwd-form');
  });

  this.When(/^I enter bad credentials into the login form$/, function() {
    browser.waitForExist('#at-pwd-form', 2000);
    browser.setValue('#at-field-email', 'test@domain.com');
    browser.setValue('#at-field-password', 'badpassword');
    browser.submitForm('form#at-pwd-form');
  });

  // this.Then(/^I am logged in$/, function() {
  //   browser.waitForExist('#menu-link-dashboard', 2000);
  //   const userId = browser
  //     .executeSync(function() {
  //       return Meteor.userId();
  //     }).value;
  //   expect(userId).not.toBe(null);
  // });

  this.Then(/^I am not logged in$/, function() {
    const userId = browser
      .executeSync(function() {
        return Meteor.userId();
      }).value;
    expect(userId).toBe(null);
  });
};
