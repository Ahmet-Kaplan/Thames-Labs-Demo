Accounts.onLogin(function(cb) {

  toastr.clear();

  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });

  if (user) {

    var profile = user.profile;
    if (profile) {

      profile.lastLogin = new Date();

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });

      LogClientEvent(LogLevel.Info, profile.name + " logged in", null, null);
    }
  }

  FlowRouter.reload();

});
