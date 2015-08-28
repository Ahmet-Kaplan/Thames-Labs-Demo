Meteor.methods({

  checkUserRole: function(userId, roleName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      if (Roles.userIsInRole(userId, "Administrator")) {
        return true;
      }

      if (Roles.userIsInRole(userId, roleName)) {
        return true;
      } else {
        return false;
      }
    }
  },

  getMaxPermission: function(userId, permissionName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      var returnedValue = 'Restricted';

      if (Roles.userIsInRole(userId, "Administrator")) {
        return 'CanDelete' + permissionName;
      }

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
    if (!Roles.userIsInRole(userId, 'Administrator')) {
      throw new Meteor.Error(403, 'Only administrators can set user roles');
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
