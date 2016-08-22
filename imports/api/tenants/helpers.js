import { Meteor } from 'meteor/meteor';

export function isTenantOverFreeUserLimit(tenantId) {
  if (!tenantId) return false;
  const tenant = Tenants.findOne({
    _id: tenantId
  });
  const maxFreeUsers = _.get(tenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
  return Meteor.users.find({
    group: tenantId
  }).count() >= maxFreeUsers;
};