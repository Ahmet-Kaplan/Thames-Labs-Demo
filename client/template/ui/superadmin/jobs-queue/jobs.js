import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';

Template.adminStatistics.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    permissionHelpers.superAdminOnly(Meteor.userId());
  });
});