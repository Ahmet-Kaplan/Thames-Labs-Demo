module.exports = function() {
  var url = require('url');

  var setPermission = function(permissionName, value, done) {
    Meteor.call('setPermission', permissionName, value, done);
  };

  this.Given(/^I have the "([^"]*)" permission$/, function(permissionName) {
    browser.executeAsync(setPermission, permissionName, true);
  });

  this.Given(/^I do not have the "([^"]*)" permission$/, function(permissionName) {
    browser.executeAsync(setPermission, permissionName, false);
  });

  this.Given(/^a restricted user exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestRestrictedUser', done);
      });
  });

  this.Then(/^the "([^"]*)" menu item is shown$/, function(menuText) {
    browser.waitForExist('#menuLink' + menuText, 5000);
    expect(browser.isExisting('#menuLink' + menuText)).toEqual(true);
  });

  this.Then(/^the "([^"]*)" menu item is not shown$/, function(menuText) {
    expect(browser.isExisting('#menuLink' + menuText)).toEqual(false);
  });

  this.Then(/^I should have the "([^"]*)" permission$/, function(permissionName) {
    var result = browser
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^I should not have the "([^"]*)" permission$/, function(permissionName) {
    var result = browser
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(false);
  });

  this.Then(/^the restricted user should have the "([^"]*)" permission$/, function(permissionName) {
    var result = browser
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^the restricted user should not have the "([^"]*)" permission$/, function(permissionName) {
    var result = browser
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(false);
  });

  this.When(/^I add permission "([^"]*)" on "([^"]*)" to a restricted user$/, function(permissionName, entityName) {
    browser.url(url.resolve(process.env.ROOT_URL, "/admin"));
    browser.waitForExist("#userAdminPanelExpander", 5000);
    browser.waitForVisible("#userAdminPanelExpander", 5000);
    browser.click("#userAdminPanelExpander");
    browser.waitForExist("#btnEditTenantUserPermissions", 5000);
    browser.waitForVisible("#btnEditTenantUserPermissions", 5000);
    browser.click("#btnEditTenantUserPermissions");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForExist("#"+ entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#"+ entityName + "PermissionSelector", 5000);
    browser.click("#"+ entityName + "PermissionSelector");
    browser.selectByValue("#"+ entityName + "PermissionSelector", permissionName);
    browser.click('#btnUpdateTenantUserPermissions');
  });

  this.When(/^I remove permissions on "([^"]*)" from a restricted user$/, function(entityName) {
    browser.url(url.resolve(process.env.ROOT_URL, "/admin"));
    browser.waitForExist("#userAdminPanelExpander", 5000);
    browser.click("#userAdminPanelExpander");
    browser.waitForExist("#btnEditTenantUserPermissions", 5000);
    browser.waitForVisible("#btnEditTenantUserPermissions", 5000);
    browser.click("#btnEditTenantUserPermissions");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForExist("#"+ entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#"+ entityName + "PermissionSelector", 5000);
    browser.click("#"+ entityName + "PermissionSelector");
    browser.selectByValue("#"+ entityName + "PermissionSelector", "Restricted");
    browser.click('#btnUpdateTenantUserPermissions');
  });
}
