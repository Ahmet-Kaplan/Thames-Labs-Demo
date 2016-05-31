Meteor.methods({

  checkUserRole: function(userId, roleName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      if (Roles.userIsInRole(userId, "Administrator")) {
        return true;
      }

      return (Roles.userIsInRole(userId, roleName));
    }
  },

  getMaxPermission: function(userId, permissionName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      var returnedValue = 'Restricted';

      if (Roles.userIsInRole(userId, 'CanRead' + permissionName)) {
        returnedValue = 'CanRead' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanCreate' + permissionName)) {
        returnedValue = 'CanCreate' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanEdit' + permissionName)) {
        returnedValue = 'CanEdit' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanDelete' + permissionName)) {
        returnedValue = 'CanDelete' + permissionName;
      }

      return returnedValue;
    }
  },

  setUserRole: function(userId, roleName, value) {
    if (!Roles.userIsInRole(this.userId, ['Administrator', 'superadmin'])) {
      throw new Meteor.Error(403, 'Only administrators can set user roles');
    }

    if(roleName == 'superadmin') {
      throw new Meteor.Error(403, 'Not allowed to set permission to superadmin');
    }

    var user = Meteor.users.findOne(userId);
    if (user) {
      if (value === true && !Roles.userIsInRole(userId, roleName)) {
        Roles.addUsersToRoles(userId, roleName);
      }

      if (value === false && Roles.userIsInRole(userId, roleName)) {
        Roles.removeUsersFromRoles(userId, roleName);
      }
    }
  }

});
