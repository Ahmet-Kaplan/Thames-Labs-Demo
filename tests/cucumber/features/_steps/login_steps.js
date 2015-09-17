module.exports = function() {

  this.Given(/^I can see the login form$/, function(callback) {
    this.client
      .waitForExist('form#at-pwd-form')
      .call(callback);
  });

  this.When(/^I can see the login form$/, function(callback) {
    this.client
      .waitForExist('form#at-pwd-form')
      .call(callback);
  });

  this.When(/^I enter good credentials into the login form$/, function(callback) {
    this.client
      .waitForExist('#at-pwd-form', 2000)
      .setValue('#at-field-email', 'test@domain.com')
      .setValue('#at-field-password', 'goodpassword')
      .submitForm('form#at-pwd-form')
      .call(callback);
  });

  this.When(/^I enter bad credentials into the login form$/, function(callback) {
    this.client
      .waitForExist('#at-pwd-form', 2000)
      .setValue('#at-field-email', 'test@domain.com')
      .setValue('#at-field-password', 'badpassword')
      .submitForm('form#at-pwd-form')
      .call(callback);
  });

  this.Then(/^I am logged in$/, function(callback) {
    this.client
      .waitForExist('#menuLinkDashboard', 2000)
      .executeAsync(function(done) {
        // browser context
        done(Meteor.userId());
      }).then(function(ret) {
        // in node.js context
        ret.value.should.exist;
        expect(ret.value).to.exist;
      })
      .call(callback);
  });

  this.Then(/^I am not logged in$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        // browser context
        done(Meteor.userId());
      }).then(function(ret) {
        // in node.js context
        expect(ret.value).to.not.exist;
      })
      .call(callback);
  });
};
