module.exports = function() {
  var url = require('url');

  this.Given(/^I have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, true);
    this.client.call(callback);
  });

  this.Given(/^I do not have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, false);
    this.client.call(callback);
  });

  this.Given(/^a restricted user exists$/, function(callback) {
    this.server.call('createTestRestrictedUser');
    this.client.call(callback);
  });

  this.Then(/^the "([^"]*)" menu item is shown$/, function(menuText, callback) {
    this.client
      .waitForExist('#menuLink' + menuText, 5000)
      .isExisting('#menuLink' + menuText)
      .then(function(isExisting) {
        expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^the "([^"]*)" menu item is not shown$/, function(menuText, callback) {
    this.client
      .waitForExist('#menuLink' + menuText, 5000, true)
      .isExisting('#menuLink' + menuText)
      .then(function(isExisting) {
        expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^I should have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should not have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^the restricted user should have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^the restricted user should not have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(false);
      })
      .call(callback);
  });

  this.When(/^I add permission "([^"]*)" on "([^"]*)" to a restricted user$/, function(permissionName, entityName, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, "/admin"))
      .waitForExist("#tenantUsers", 5000)
      .click("#tenantUsers")
      .waitForVisible("#btnEditTenantUserPermissions", 5000)
      .click("#btnEditTenantUserPermissions")
      .waitForExist(".modal-dialog", 5000)
      .waitForVisible("#"+ entityName + "PermissionSelector", 5000)
      .click("#"+ entityName + "PermissionSelector")
      .selectByValue("#"+ entityName + "PermissionSelector", permissionName)
      .click('#btnUpdateTenantUserPermissions')
      .call(callback);
  });

  this.When(/^I remove permissions on "([^"]*)" from a restricted user$/, function(entityName, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, "/admin"))
      .waitForExist("#tenantUsers", 5000)
      .click("#tenantUsers")
      .waitForVisible("#btnEditTenantUserPermissions", 5000)
      .click("#btnEditTenantUserPermissions")
      .waitForExist(".modal-dialog", 5000)
      .waitForVisible("#"+ entityName + "PermissionSelector", 5000)
      .click("#"+ entityName + "PermissionSelector")
      .selectByValue("#"+ entityName + "PermissionSelector", "Restricted")
      .click('#btnUpdateTenantUserPermissions')
      .call(callback);
  });
}
