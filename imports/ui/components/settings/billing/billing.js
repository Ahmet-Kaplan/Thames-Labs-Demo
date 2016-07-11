import './billing.css';
import './billing.html';

Template.billing.helpers({
  isFreeProTenant: function() {
    if (!Meteor.user() || !Meteor.user().group) return false;
    const tenant = Tenants.findOne(Meteor.user().group);
    return tenant.plan === 'pro' && !tenant.stripe.stripeSubs;
  }
});