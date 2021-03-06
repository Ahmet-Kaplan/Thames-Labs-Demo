module.exports = function() {

  function setPermission(permissionName, value, done) {
    Meteor.call('setPermission', permissionName, value, done);
  }

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
    browser.waitForExist('#menu-link-' + menuText.toLowerCase(), 5000);
    expect(browser.isExisting('#menu-link-' + menuText.toLowerCase())).toEqual(true);
  });

  this.Then(/^the "([^"]*)" menu item is not shown$/, function(menuText) {
    expect(browser.isExisting('#menu-link-' + menuText.toLowerCase())).toEqual(false);
  });

  this.Then(/^I should have the "([^"]*)" permission$/, function(permissionName) {
    const result = browser
      .executeAsync(function(innerPermissionName, done) {
        const user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, innerPermissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^I should not have the "([^"]*)" permission$/, function(permissionName) {
    const result = browser
      .executeAsync(function(innerPermissionName, done) {
        const user = Meteor.user();
        Meteor.call('checkUserHasPermission', user.username, innerPermissionName, function(err, res) {
          done(res);
        });
      }, permissionName);
    expect(result.value).toBe(false);
  });

  this.Then(/^the user "([^"]*)" should have the "([^"]*)" permission$/, function(userName, permissionName) {
    const result = browser
      .executeAsync(function(innerUserName, innerPermissionName, done) {
        Meteor.call('checkUserHasPermission', innerUserName, innerPermissionName, function(err, res) {
          done(res);
        });
      }, userName, permissionName);
    expect(result.value).toBe(true);
  });

  this.Then(/^the user "([^"]*)" should not have the "([^"]*)" permission$/, function(userName, permissionName) {
    const result = browser
      .executeAsync(function(innerUserName, innerPermissionName, done) {
        Meteor.call('checkUserHasPermission', innerUserName, innerPermissionName, function(err, res) {
          done(res);
        });
      }, userName, permissionName);
    expect(result.value).toBe(false);
  });

  this.Then(/^the restricted user should not exist in the database$/, function() {
    const result = browser
      .executeAsync(function(done) {
        Meteor.call('getUserByEmail', 'restricted@domain.com', function(err, res) {
          done(res);
        });
      });
    expect(result.value).toBe(null);
  });

  this.When(/^I add permission "([^"]*)" on "([^"]*)" to a restricted user$/, function(permissionName, entityName) {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
    browser.safeClick('a#user-link');
    //The admin is listed as well, need to select the last child which is the restricted user
    browser.waitForExist(".user-detail-link", 5000);
    browser.scroll(".user-detail-link", 0, 200);
    browser.safeClick("#user-list .list-group-item:last-child a");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForVisible(".modal-dialog", 5000);
    browser.waitForExist("#" + entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#" + entityName + "PermissionSelector", 5000);
    browser.safeClick("#" + entityName + "PermissionSelector");
    browser.selectByValue("#" + entityName + "PermissionSelector", permissionName);
    browser.safeClick('#update-user');
  });

  this.When(/^I add permission "([^"]*)" on "([^"]*)" to myself$/, function(permissionName, entityName) {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
    browser.safeClick('a#user-link');
    //The admin is listed as well, need to select the last child which is the restricted user
    browser.waitForExist(".user-detail-link", 5000);
    browser.scroll(".user-detail-link", 0, 200);
    browser.safeClick("#user-list .list-group-item:last-child a");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForVisible(".modal-dialog", 5000);
    browser.waitForExist("#" + entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#" + entityName + "PermissionSelector", 5000);
    browser.safeClick("#" + entityName + "PermissionSelector");
    browser.selectByValue("#" + entityName + "PermissionSelector", permissionName);
    browser.safeClick('#update-user');
  });

  this.When(/^I remove permissions on "([^"]*)" from a restricted user$/, function(entityName) {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
    browser.safeClick('a#user-link');
    //The admin is listed as well, need to select the last child which is the restricted user
    browser.waitForExist(".user-detail-link", 5000);
    browser.scroll(".user-detail-link", 0, 200);
    browser.safeClick("#user-list .list-group-item:last-child a");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForVisible(".modal-dialog", 5000);
    browser.waitForExist("#" + entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#" + entityName + "PermissionSelector", 5000);
    browser.safeClick("#" + entityName + "PermissionSelector");
    browser.selectByValue("#" + entityName + "PermissionSelector", "Restricted");
    browser.safeClick('#update-user');
  });

  this.When(/^I remove permissions on "([^"]*)" for myself$/, function(entityName) {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
    browser.safeClick('a#user-link');
    //The admin is listed as well, need to select the last child which is the restricted user
    browser.waitForExist(".user-detail-link", 5000);
    browser.scroll(".user-detail-link", 0, 200);
    browser.safeClick("#user-list .list-group-item:last-child a");
    browser.waitForExist(".modal-dialog", 5000);
    browser.waitForVisible(".modal-dialog", 5000);
    browser.waitForExist("#" + entityName + "PermissionSelector", 5000);
    browser.waitForVisible("#" + entityName + "PermissionSelector", 5000);
    browser.safeClick("#" + entityName + "PermissionSelector");
    browser.selectByValue("#" + entityName + "PermissionSelector", "Restricted");
    browser.safeClick('#update-user');
  });
};
