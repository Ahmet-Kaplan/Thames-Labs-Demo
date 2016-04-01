import {reset} from '../_fixtures/reset.js';
import {createTenant} from '../_fixtures/createTenant.js';
import {createUser} from '../_fixtures/createUser.js';

module.exports = function() {

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  // called before each scenario
  this.Before(function() {
    // Setup default tenant and user
    server.execute(reset);
    const tenantId = server.execute(createTenant);
    server.execute(createUser, tenantId);

    // Setup browser
    browser.setViewportSize({
      width: 1200,
      height: 700
    });
    browser.url(process.env.ROOT_URL);

    // Login as test user
    browser.executeAsync(login, 'test@domain.com', 'goodpassword');

    // Add custom commands
    browser.addCommand('selectize', function(selector, value) {
      const selectizeInput = '' + selector + ' + .selectize-control>.selectize-input>input',
          selectizeDropdown = '' + selector + ' + .selectize-control>.selectize-dropdown';
      browser.waitForExist(selectizeInput, 5000);
      browser.waitForVisible(selectizeInput, 5000);
      browser.setValue(selectizeInput, value);
      browser.keys('Enter');
      browser.waitForVisible(selectizeDropdown, 5000, true);
    });
    browser.addCommand('userId', function() {
      return browser.execute(function() {
        return Meteor.userId();
      }).value;
    });
  });

};
