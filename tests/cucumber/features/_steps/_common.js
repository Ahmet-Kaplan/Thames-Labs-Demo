module.exports = function() {

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  var url = require('url');

/***************************************************
                        GIVEN
***************************************************/
  this.Given(/^a user exists$/, function(callback) {
    this.server.call('createTestTenant');
    this.server.call('createTestUser');
    this.client.call(callback);
  });

  this.Given(/^a superuser exists$/, function(callback) {
    this.server.call('createTestSuperUser');
    this.client.call(callback);
  });

  this.Given(/^I am a logged out user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .call(callback);
  });

  this.Given(/^I am a logged in user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(login, 'test@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Given(/^I am a logged in superadmin user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin')
      .call(callback);
  });

  this.Given(/^I have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, true);
    this.client.call(callback);
  });


  this.Given(/^I DO NOT have the "([^"]*)" permission$/, function(permissionName, callback) {
    this.server.call('setPermission', permissionName, false);
    this.client.call(callback);
  });

  this.Given(/^a company has been created$/, function(callback) {
    this.server.call('addCompany', 'Test Ltd');
    this.client.call(callback);
  });

/***************************************************
                        WHEN
***************************************************/

  this.When(/^I navigate to "([^"]*)"$/, function(relativePath, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, relativePath))
      .call(callback);
  });

  this.When(/^I click "([^"]*)"$/, function(id, callback) {
  this.client
    .waitForVisible(id, 2000)
    .scroll(id)
    .click(id)
    .call(callback);
  });


  /***************************************************
                          THEN
  ***************************************************/
  this.Then(/^I should see "([^"]*)"$/, function(id, callback) {
    this.client
      .isExisting(id)
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should not see "([^"]*)"$/, function(id, callback) {
    this.client
      .isExisting(id)
      .then(function(isExisting) {
          expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function(expectedHeading, callback) {
    this.client
      .waitForVisible('h1*=' + expectedHeading, 2000)
      .getText('h1*=' + expectedHeading)
      .call(callback);
  });

  this.Then(/^I should see a modal$/, function(callback) {
    this.client
      //.waitForVisible('.modal-dialog', 5000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should not see a modal$/, function(callback) {
    this.client
      .waitForExist('.modal-dialog', 5000, true)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^I should see a modal with title "([^"]*)"$/, function(expectedText, callback) {
    this.client
      .waitForVisible('.modal-header', 5000)
      .getText('h4=' + expectedText)
      .call(callback);
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

  this.Then(/^debug$/, function(menuText, callback) {
    this.client
      .debug()
      .call(callback);
  });
};
