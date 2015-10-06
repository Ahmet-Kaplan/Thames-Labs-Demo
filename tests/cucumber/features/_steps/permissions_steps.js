module.exports = function() {
  var url = require('url');

  var setPermission = function(permissionName, value, done) {
    Meteor.call('setPermission', permissionName, value, done);
  };

  this.Given(/^I have the "([^"]*)" permission$/, function(permissionName) {
    client.executeAsync(setPermission, permissionName, true);
  });

  this.Given(/^I do not have the "([^"]*)" permission$/, function(permissionName) {
    client.executeAsync(setPermission, permissionName, false);
  });

  this.Given(/^a restricted user exists$/, function() {
    client
      .executeAsync(function(done) {
        Meteor.call('createTestRestrictedUser', done);
      });
  });

  this.Then(/^the "([^"]*)" menu item is shown$/, function(menuText) {
    client.waitForExist('#menuLink' + menuText, 5000);
    expect(client.isExisting('#menuLink' + menuText)).toEqual(true);
  });

  this.Then(/^the "([^"]*)" menu item is not shown$/, function(menuText) {
    client.waitForExist('#menuLink' + menuText, 5000, true);
    expect(client.isExisting('#menuLink' + menuText)).toEqual(false);
  });

  this.Then(/^I should have the "([^"]*)" permission$/, function(permissionName) {
    var result = client
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^I should not have the "([^"]*)" permission$/, function(permissionName) {
    var result = client
      .executeAsync(function(permissionName, done) {
        var user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(false);
  });

  this.Then(/^the restricted user should have the "([^"]*)" permission$/, function(permissionName) {
    var result = client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^the restricted user should not have the "([^"]*)" permission$/, function(permissionName) {
    var result = client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'restricted user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(false);
  });

  this.When(/^I add permission "([^"]*)" on "([^"]*)" to a restricted user$/, function(permissionName, entityName) {
    client.url(url.resolve(process.env.ROOT_URL, "/admin"));
    client.waitForExist("#userAdminPanelExpander", 5000);
    client.click("#userAdminPanelExpander");
    client.waitForVisible("#btnEditTenantUserPermissions", 5000);
    client.click("#btnEditTenantUserPermissions");
    client.waitForExist(".modal-dialog", 5000);
    client.waitForVisible("#"+ entityName + "PermissionSelector", 5000);
    client.click("#"+ entityName + "PermissionSelector");
    client.selectByValue("#"+ entityName + "PermissionSelector", permissionName);
    client.click('#btnUpdateTenantUserPermissions');
  });

  this.When(/^I remove permissions on "([^"]*)" from a restricted user$/, function(entityName) {
    client.url(url.resolve(process.env.ROOT_URL, "/admin"));
    client.waitForExist("#userAdminPanelExpander", 5000);
    client.click("#userAdminPanelExpander");
    client.waitForVisible("#btnEditTenantUserPermissions", 5000);
    client.click("#btnEditTenantUserPermissions");
    client.waitForExist(".modal-dialog", 5000);
    client.waitForVisible("#"+ entityName + "PermissionSelector", 5000);
    client.click("#"+ entityName + "PermissionSelector");
    client.selectByValue("#"+ entityName + "PermissionSelector", "Restricted");
    client.click('#btnUpdateTenantUserPermissions');
  });
}
