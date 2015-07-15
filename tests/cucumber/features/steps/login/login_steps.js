module.exports = function () {

  var url = require('url');

  var logout = function(done) {
    Meteor.logout(done);
  };

  this.Given(/^I am logged out$/, function (callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .call(callback);
  });

  this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, relativePath))
      .call(callback);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Given(/^I can see the login form$/, function(callback) {
    this.client
      .waitForExist('form#at-pwd-form')
      .call(callback);
  });

  this.When(/^I login with good credentials$/, function(callback) {
    this.client
      .setValue('#at-field-email', 'test@domain.com')
      .setValue('#at-field-password', 'goodpassword')
      .submitForm('form#at-pwd-form')
      .call(callback);
  });

  this.When(/^I login with bad credentials$/, function(callback) {
    this.client
      .setValue('#at-field-email', 'test@domain.com')
      .setValue('#at-field-password', 'badpassword')
      .submitForm('form#at-pwd-form')
      .call(callback);
  });

  this.Then(/^I am logged in$/, function(callback) {
    this.client
      .waitForExist('#at-pwd-form', 2000, true)
      .execute(function() {
        // browser context
        return Meteor.userId();
      }).then(function(ret) {
        // in node.js context
        ret.value.should.exist; // chai should syntax
        expect(ret.value).to.exist; // chai expect syntax
      })
      .call(callback);
  });

  this.Then(/^I am not logged in$/, function(callback) {
    this.client
      .execute(function() {
        // browser context
        return Meteor.userId();
      }).then(function(ret) {
        // in node.js context
        expect(ret.value).to.not.exist; // chai expect syntax
      })
      .call(callback);
  });
};
