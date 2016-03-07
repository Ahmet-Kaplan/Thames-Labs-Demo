Accounts.onLogin(function(cb) {
  toastr.clear();

  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  var snapshot = new Date();

  if (user) {

    if (!Roles.userIsInRole(user._id, 'superadmin')) {
      if (!IsTenantPro(user.group)) {

        if (!Roles.userIsInRole(user._id, 'Administrator')) {
          Roles.addUsersToRoles(user._id, ["Administrator"]);
        }
        _.each(defaultPermissionsList, function(p) {
          if (!Roles.userIsInRole(user._id, p)) {
            Roles.addUsersToRoles(user._id, p);
          }
        })
      };
    }

    var profile = user.profile;
    if (profile) {
      profile.lastLogin = snapshot;

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });

      logEvent("info", profile.name + " logged in.");
    }
  }

  FlowRouter.reload();

});
