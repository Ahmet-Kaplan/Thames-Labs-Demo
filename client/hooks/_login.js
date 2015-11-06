Accounts.onLogin(function(cb) {

  if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
    // Meteor.logoutOtherClients();
  }

  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  var snapshot = new Date();

  if (user) {

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