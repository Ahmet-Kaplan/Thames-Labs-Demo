import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const permissionHelpers = {
  // Helper which rediects if the current user doesn't have a given permission
  // Typically called in an autorun on a view, so we take the userId as a parameter
  // to force the autorun to call Meteor.userId() so that it updates
  redirectWithoutPermission(userId, permissionName) {
    // Also keep superadmin off these routes
    if (Roles.userIsInRole(userId, 'superadmin')) return FlowRouter.go('tenants');

    if (!Roles.userIsInRole(userId, [permissionName])) {
      FlowRouter.go('dashboard');
    }
  },
  superAdminOnly(userId) {
    if (!Roles.userIsInRole(userId, 'superadmin')) FlowRouter.go('dashboard');
  }
};
