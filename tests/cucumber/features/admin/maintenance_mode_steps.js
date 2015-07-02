module.exports = function() {

  var url = require('url');

  var loginAsSuperadmin = function(done) {
    Meteor.loginWithPassword('superadmin', 'admin', done);
  };

  this.Given(/^I am a superadmin$/, function (callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/'))
      .executeAsync(loginAsSuperadmin)
      .call(callback);
  });

  this.Given(/^a superadmin has put the site into maintenance mode$/, function (callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/'))
      .executeAsync(loginAsSuperadmin)
      .executeAsync(function(done) {
        // in browser
        Meteor.call('setMaintenanceMode', true, function(err, res) {
          done();
        });
      })
      .call(callback);
  });

  this.When(/^I activate maintenance mode$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        // in browser
        Meteor.call('setMaintenanceMode', true, function(err, res) {
          done();
        });
      })
      .call(callback);
  });

  this.Then(/^I see the site as normal$/, function(callback) {
    this.client
      .waitForExist('.navbar-brand')
      .getText('.navbar-brand', function(err, text) {
        expect(text).to.contain('RealtimeCRM');
      })
      .call(callback);
  });

  this.Then(/^I see a spinner$/, function(callback) {
    this.client
      .waitForExist('.pg-loading')
      .call(callback)
  })

};
