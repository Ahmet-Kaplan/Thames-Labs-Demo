import {createSecondTenant} from '../_fixtures/createSecondTenant.js';
import {createSecondUser} from '../_fixtures/createSecondUser.js';

module.exports = function() {
  this.Given(/^a second (free|pro) tenant exists$/, function(option) {
    const secondTenantId = server.execute(createSecondTenant);
    server.execute(createSecondUser, secondTenantId);
    if (option === 'pro') {
      server.call('setSecondTenantToProPlan');
    }
  });
}
