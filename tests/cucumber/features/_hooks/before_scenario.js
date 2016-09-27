import {reset} from '../_fixtures/reset.js';
import {createTenant} from '../_fixtures/createTenant.js';
import {createUser} from '../_fixtures/createUser.js';

module.exports = function() {

  function login(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  }

  // called before each scenario
  this.Before(function() {
    // Reset data
    server.execute(reset);

    // Setup default tenant and user
    const tenantId = server.execute(createTenant, 'Acme Corp');
    server.execute(createUser, tenantId, 'Test User', 'test@domain.com');

    //Navigate to root url
    browser.click('.navbar-brand');

    // Login as test user
    browser.executeAsync(login, 'test@domain.com', 'goodpassword');
  });

  this.After(function() {
    //Close any open modals
    browser.timeouts('implicit', 1500);
    if(browser.isExisting('#draggableModal')) {
      browser.execute(function(done) {
        $("[data-dismiss=modal]").trigger({ type: "click" });
      });
    }
  });
};
