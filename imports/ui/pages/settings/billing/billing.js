import { redirectWithoutPermission } from '/imports/api/global-helpers/permissions-helpers.js';
import './billing.html';
import '/imports/ui/components/settings/billing/billing.js';

Template.billingSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});