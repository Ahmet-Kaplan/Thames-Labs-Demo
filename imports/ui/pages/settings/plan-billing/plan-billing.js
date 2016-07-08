import './plan-billing.html';
import '/imports/ui/components/settings/plan-billing/plan-billing.js';

Template.planBillingSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});