module.exports = function() {

  this.Given(/^I have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, true);
    this.client.call(callback);
  });

  this.Given(/^I do not have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, false);
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
        expect(res.value).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^the user should have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'test user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^the user should not have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.client
      .executeAsync(function(permissionName, done) {
        Meteor.call('checkUserHasPermission', 'test user', permissionName, function(err, res) {
          done(res);
        });
      }, permissionName)
      .then(function(res) {
        expect(res.value).to.equal(true);
      })
      .call(callback);
  });
}
