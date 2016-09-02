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

    // Navigate to root URL
    browser.url(process.env.ROOT_URL);

    // Login as test user
    browser.executeAsync(login, 'test@domain.com', 'goodpassword');
  });

};