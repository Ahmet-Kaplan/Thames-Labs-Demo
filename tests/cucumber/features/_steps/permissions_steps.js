module.exports = function() {

  var url = require('url');

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  // this.Given(/^a company has been created$/, function(callback) {
  //   this.client
  //     .executeAsync(function(done) {
  //       Meteor.call('createTestCompany', function(err, data) {
  //         done(data);
  //       });
  //     })
  //     .then(function(data) {
  //       expect(data.value).to.exist;
  //     })
  //     .call(callback);
  // });

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

  this.Then(/^the user will have the "([^"]*)" role$/, function(role, callback) {
    this.client.executeAsync(function(done) {
      Meteor.call('checkUserHasPermission', 'test user', role, function(err, data) {
        done(data);
      });
    }).then(function(data) {
      expect(data.value).to.equal(true);
    }).call(callback);
  });

  this.When(/^I open the user menu$/, function(callback) {
    this.client
      .waitForVisible('#general-dropdown', 2000)
      .click('#general-dropdown')
      .call(callback);
  });

  this.Then(/^I see the Administration menu option$/, function(callback) {
    this.client
      .isExisting('#Administration').then(function(isExisting) {
        expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Given(/^I have the "([^"]*)" role$/, function(role, callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('checkUserHasPermission', 'test user', role, function(err, data) {
          done(data);
        });
      }).then(function(data) {
        expect(data.value).to.equal(true);
      }).call(callback);
  });

  this.Given(/^I do not have the "([^"]*)" role$/, function(role, callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('checkUserHasPermission', 'test user 2', role, function(err, data) {
          done(data);
        });
      }).then(function(data) {
        expect(data.value).to.equal(false);
      }).call(callback);
  });

  this.When(/^I click the Administration menu option$/, function(callback) {
    this.client
      .waitForVisible('#general-dropdown', 2000)
      .click('#general-dropdown')
      .waitForVisible('#Administration', 2000)
      .click('#Administration')
      .call(callback);
  });

  this.Given(/^I am a normal user$/, function(callback) {
    this.client
      .executeAsync(logout)
      .executeAsync(login, 'test2@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Then(/^I cannot see the Administration menu option$/, function(callback) {
    this.client
      .isExisting('#Administration').then(function(isExisting) {
        expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^the "([^"]*)" menu item is shown$/, function(menuText, callback) {
    this.client
      .isExisting('#menuLink' + menuText).then(function(isExisting) {
        expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^the "([^"]*)" menu item is not shown$/, function(menuText, callback) {
    this.client
      .isExisting('#menuLink' + menuText).then(function(isExisting) {
        expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^I can see the "([^"]*)" button$/, function(buttonId, callback) {
    this.client
      .isExisting('#' + buttonId).then(function(isExisting) {
        expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I cannot see the "([^"]*)" button$/, function(buttonId, callback) {
    this.client
      .isExisting('#' + buttonId).then(function(isExisting) {
        expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.When(/^I navigate to a company detail page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/companies'))
      .waitForExist('#mchCompany', 2000)
      .click('#mchCompany')
      .call(callback);
  });
};
