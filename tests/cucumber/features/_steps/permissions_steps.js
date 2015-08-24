module.exports = function() {

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  this.Given(/^I am a logged in superadmin user$/, function(callback) {
    this.client
      .setViewportSize({
        width: 1000,
        height: 800
      })
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin')
      .call(callback);
  });

  this.When(/^I open the tenancy user settings form$/, function(callback) {
    this.client
      .waitForVisible('.accordion-toggle', 2000)
      .click('.accordion-toggle')
      .waitForVisible('#btnEditTenantUser', 2000)
      .click('#btnEditTenantUser')
      .call(callback);
  });

  this.When(/^I set the user as an administrator$/, function(callback) {
    this.client
      .waitForVisible('#cbUserIsTenantAdministrator', 2000)
      .click('#cbUserIsTenantAdministrator')
      .click('#btnUpdateTenantUser')
      .call(callback);
  });

  this.Then(/^the user will have the role$/, function(callback) {
    this.client.executeAsync(function(done) {
      Meteor.call('checkUserHasPermission', 'Administrator', function(err, data) {
        done(data);
      });
    }).then(function(data) {
      expect(data.value).to.equal(true);
    }).call(callback);
  });
};
