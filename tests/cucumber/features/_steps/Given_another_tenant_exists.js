import {createTenant} from '../_fixtures/createTenant.js';
import {createUser} from '../_fixtures/createUser.js';

module.exports = function() {
  this.Given(/^another (free|pro) tenant exists$/, function(plan) {
    const tenantId = server.execute(createTenant, 'Acme Corp Rivals', plan);
    server.execute(createUser, tenantId, 'Test User 2', 'test2@domain.com');
  });
}
