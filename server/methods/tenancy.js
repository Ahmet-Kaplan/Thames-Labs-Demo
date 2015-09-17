Meteor.methods({
  deleteAllTenantUsers: function(tenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only Cambridge Software Admins can delete tenants.');
    }

    Meteor.users.remove({group: tenantId}, function(error) {
      if(error) {
        LogServerEvent('error', 'Unable to remove all the users for this tenant.', 'tenant', tenantId);
        return false;
      }
    });
  }
});
