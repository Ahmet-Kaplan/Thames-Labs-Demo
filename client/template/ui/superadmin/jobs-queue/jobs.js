import { superAdminOnly } from '/imports/api/global-helpers/permissions-helpers.js';

Template.adminStatistics.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});