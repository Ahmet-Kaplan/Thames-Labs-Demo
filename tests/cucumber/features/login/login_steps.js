module.exports = function () {

  var url = require('url');

  this.Given(/^I am a new user$/, function () {
    return this.server.call('reset');
  });

  this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, relativePath))
      .call(callback);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
    this.client
      .waitFor('div.at-form')
      .getTitle().should.become(expectedTitle).and.notify(callback);
  });

  this.Then(/^I enter my authentication information$/, function (callback) {
    this.client
      .waitFor('div.at-form')
      .setValue('input#at-field-email', 'test@domain.com')
      .setValue('input#at-field-password', 'goodpassword')
      .submitForm('#at-pwd-form')
      .call(callback)
  });

  this.Then(/^I should be logged in$/, function (callback) {
    this.client
      .waitForExist('#at-nav-button')
      .getText('#at-nav-button', function(err, text) {
        text.should.equal('Sign Out');
      })
      .call(callback)
  });

  this.Then(/^I should not be logged in$/, function (callback) {
    this.client
      .waitForExist('.at-error')
      .getText('.at-error', function(err, text) {
        text.should.equal('Login forbidden');
      })
      .call(callback)
  });

};
