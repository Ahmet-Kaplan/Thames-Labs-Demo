import './free-plan/free-plan.js';
import './pro-plan/pro-plan.js';
import './plan-billing.css';
import './plan-billing.html';

Template.planBilling.helpers({
  //Determine plan type
  isProTenant: function() {
    if (!Meteor.user() || !Meteor.user().group) return false;
    const tenant = Tenants.findOne(Meteor.user().group);
    return Tenants.findOne({
      _id: Meteor.user().group
    }).plan === 'pro' && tenant.stripe.stripeSubs;
  },
  isFreeTenant: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).plan === 'free';
  },
  isFreeProTenant: function() {
    if (!Meteor.user() || !Meteor.user().group) return false;
    const tenant = Tenants.findOne(Meteor.user().group);
    return tenant.plan === 'pro' && !tenant.stripe.stripeSubs;
  }
});