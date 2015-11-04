Template.adminStatistics.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});