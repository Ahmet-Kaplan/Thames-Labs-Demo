module.exports = function() {

  var url = require('url');

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  this.Given(/^a company has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestCompany', function(err, data) {
          done(data);
        });
      })
      // .then(function(data) {
      //   expect(data.value).to.exist;
      // })
      .call(callback);
  });

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

  this.Given(/^I am a user$/, function(callback) {
    this.client
      .setViewportSize({
        width: 1000,
        height: 800
      })
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .executeAsync(login, 'test@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Given(/^I am a restricted user$/, function(callback) {
    this.client
      .executeAsync(logout)
      .executeAsync(login, 'dummy@domain.com', 'goodpassword')
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

  this.Then(/^the standard user will have the "([^"]*)" role$/, function(role, callback) {
    this.client.executeAsync(function(role, done) {
      Meteor.call('checkUserHasPermission', 'test user', role, function(err, data) {
        done(data);
      });
    }, role).then(function(data) {
      expect(data.value).to.equal(true);
    }).call(callback);
  });

  this.Then(/^the standard user will not have the "([^"]*)" role$/, function(role, callback) {
    this.client.executeAsync(function(role, done) {
      Meteor.call('checkUserHasPermission', 'test user', role, function(err, data) {
        done(data);
      });
    }, role).then(function(data) {
      expect(data.value).to.equal(false);
    }).call(callback);
  });

  this.Then(/^the user will have the "([^"]*)" role$/, function(role, callback) {
    this.client.executeAsync(function(role, done) {
      Meteor.call('checkUserHasPermission', 'dummy', role, function(err, data) {
        done(data);
      });
    }, role).then(function(data) {
      expect(data.value).to.equal(true);
    }).call(callback);
  });

  this.Then(/^the user will not have the "([^"]*)" role$/, function(role, callback) {
    this.client.executeAsync(function(role, done) {
      Meteor.call('checkUserHasPermission', 'dummy', role, function(err, data) {
        done(data);
      });
    }, role).then(function(data) {
      expect(data.value).to.equal(false);
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
      .executeAsync(function(role, done) {
        Meteor.call('checkUserHasPermission', 'test user', role, function(err, data) {
          done(data);
        });
      }, role).then(function(data) {
        expect(data.value).to.equal(true);
      }).call(callback);
  });

  this.Given(/^I do not have the "([^"]*)" role$/, function(role, callback) {
    this.client
      .executeAsync(function(role, done) {
        Meteor.call('checkUserHasPermission', 'dummy', role, function(err, data) {
          done(data);
        });
      }, role).then(function(data) {
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
      .isExisting(buttonId).then(function(isExisting) {
        expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I cannot see the "([^"]*)" button$/, function(buttonId, callback) {
    this.client
      .isExisting(buttonId).then(function(isExisting) {
        expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.When(/^I navigate to a company detail page$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .click('#menuLinkCompanies')
      .waitForExist('#mchCompany', 2000)
      .click('#mchCompany')
      .call(callback);
  });

  this.When(/^I open the user settings modal$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .waitForVisible('#general-dropdown', 2000)
      .click('#general-dropdown')
      .waitForVisible('#Administration', 2000)
      .click('#Administration')
      .waitForVisible('#userAdminPanelExpander', 2000)
      .click('#userAdminPanelExpander')
      .waitForVisible('#btnEditTenantUserPermissions', 2000)
      .click('#btnEditTenantUserPermissions')
      .waitForVisible('#btnUpdateTenantUserPermissions', 2000)
      .call(callback);
  });

  this.When(/^I save the form$/, function(callback) {
    this.client
      .click('#btnUpdateTenantUserPermissions')
      .call(callback);
  });

  this.When(/^I add the "CanReadCompanies" permission to a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanRead')
      .call(callback);
  });
  this.When(/^I add the "CanCreateCompanies" permission to a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanCreate')
      .call(callback);
  });
  this.When(/^I add the "CanEditCompanies" permission to a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanEdit')
      .call(callback);
  });
  this.When(/^I add the "CanDeleteCompanies" permission to a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanDelete')
      .call(callback);
  });

  this.When(/^I remove the "CanDeleteCompanies" permission from a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanEdit')
      .call(callback);
  });
  this.When(/^I remove the "CanEditCompanies" permission from a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanCreate')
      .call(callback);
  });
  this.When(/^I remove the "CanCreateCompanies" permission from a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'CanRead')
      .call(callback);
  });
  this.When(/^I remove the "CanReadCompanies" permission from a user$/, function(callback) {
    this.client
      .selectByValue('#CompaniesPermissionSelector', 'Restricted')
      .call(callback);
  });
};
