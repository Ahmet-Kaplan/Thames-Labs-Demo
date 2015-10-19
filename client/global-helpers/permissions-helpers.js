// Helper which rediects if the current user doesn't have a given permission
// Typically called in an autorun on a view, so we take the userId as a parameter
// to force the autorun to call Meteor.userId() so that it updates
redirectWithoutPermission = function(userId, permissionName) {
  // Also keep superadmin off these routes
  if (Roles.userIsInRole(userId, 'superadmin')) return FlowRouter.go('tenants');

  if (!Roles.userIsInRole(userId, ['Administrator', permissionName])) {
    FlowRouter.go('dashboard');
    toastr.error('You were redirected to the dashboard as your permission to view the previous page was revoked');
  }
};

superAdminOnly = function(userId) {
  if (!Roles.userIsInRole(userId, 'superadmin')) FlowRouter.go('dashboard');
};
