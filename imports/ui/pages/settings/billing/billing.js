import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import './billing.html';
import '/imports/ui/components/settings/billing/billing.js';

Template.billingSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});