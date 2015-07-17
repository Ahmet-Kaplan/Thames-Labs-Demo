module.exports = function() {

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  this.Given(/^I am a logged out user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .call(callback);
  });

  this.Given(/^I am a logged in user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .executeAsync(login, 'test@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Given(/^I am a logged in superadmin user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin')
      .call(callback);
  });

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
      .waitForExist('#at-pwd-form', 2000, true)
      .executeAsync(function(done) {
        // browser context
        done(Meteor.userId());
      }).then(function(ret) {
        // in node.js context
        ret.value.should.exist; // chai should syntax
        expect(ret.value).to.exist; // chai expect syntax
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
        expect(ret.value).to.not.exist; // chai expect syntax
      })
      .call(callback);
  });
};
