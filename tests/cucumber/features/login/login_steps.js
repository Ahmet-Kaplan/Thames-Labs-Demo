module.exports = function () {

  var url = require('url');

  var logout = function(done) {
    Meteor.logout(done);
  };

  this.Given(/^I am a new user$/, function (callback) {
    this.client
      .setViewportSize({
        width: 1024,
        height: 768
      })
      .url(url.resolve(process.env.ROOT_URL, '/'))
      .executeAsync(logout)
      .call(callback);
  });

  this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, relativePath))
      .call(callback);
  });

  this.When(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
    this.client
      .waitFor('div.at-form')
      .getTitle().should.become(expectedTitle).and.notify(callback);
  });

  this.When(/^I enter good authentication information$/, function (callback) {
    this.client
      .waitFor('#at-pwd-form')
      .setValue('input#at-field-email', 'test@domain.com')
      .setValue('input#at-field-password', 'goodpassword')
      .submitForm('#at-pwd-form')
      .call(callback)
  });

  this.When(/^I enter bad authentication information$/, function (callback) {
    this.client
      .waitFor('#at-pwd-form')
      .setValue('input#at-field-email', 'test@domain.com')
      .setValue('input#at-field-password', 'badpassword')
      .submitForm('#at-pwd-form')
      .call(callback)
  });

  this.Then(/^I should be logged in$/, function (callback) {
    this.client
      .waitForExist('li.dropdown')
      .getText('a.dropdown-toggle', function(err, text) {
        text.should.contain('test user');
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

  this.Then(/^I should not see superadmin stuff$/, function (callback) {
    this.client
      .waitForExist('.navbar-nav')
      .getText('a[href="/tenants"]', function(err, text) {
        expect(text).to.not.exist;
      })
      .getText('a[href="/notifications"]', function(err, text) {
        expect(text).to.not.exist;
      })
      .call(callback)
  });

  this.Then(/^I should see the dashboard$/, function(callback) {
    this.client
      .waitForExist('#id-view-content h1')
      .getText('#id-view-content h1', function(err, text) {
        expect(text).to.contain('Dashboard');
      });
  });

};
