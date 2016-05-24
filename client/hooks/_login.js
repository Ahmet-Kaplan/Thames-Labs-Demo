Accounts.onLogin(function(cb) {

  toastr.clear();

  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });

  if (user) {

    // if (!Roles.userIsInRole(user._id, 'superadmin')) {
    //   if (!isProTenant(user.group)) {

    //     if (!Roles.userIsInRole(user._id, 'Administrator')) {
    //       Roles.addUsersToRoles(user._id, ["Administrator"]);
    //     }
    //     _.each(defaultPermissionsList, function(p) {
    //       if (!Roles.userIsInRole(user._id, p)) {
    //         Roles.addUsersToRoles(user._id, p);
    //       }
    //     })
    //   };
    // }

    var profile = user.profile;
    if (profile) {

      profile.lastLogin = new Date();

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });

      LogClientEvent(LogLevel.Info, profile.name + " logged in", undefined, undefined);
    }
  }

  FlowRouter.reload();

});