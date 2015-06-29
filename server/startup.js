Meteor.startup(function() {
  //Keep tenant information sync'ed
  var tenants = Tenants.find({
    settings: {
      $exists: 0
    }
  }).fetch();

  _.forEach(tenants, function(t) {

    if (typeof t.settings === "undefined") {
      Tenants.update(t._id, {
        $set: {
          settings: tenancyDefaultSettings
        }
      });
    }
  });

  //Keep users information sync'ed
  var users = Meteor.users.find({}).fetch();

  _.forEach(users, function(u) {
    if (u.profile) {

      if (typeof u.profile.lastLogin === "undefined") {

        Meteor.users.update(u._id, {
          $set: {
            "profile.lastLogin": new Date()
          }
        });

      }

      if (typeof u.profile.lastActivity === "undefined") {

        Meteor.users.update(u._id, {
          $set: {
            "profile.lastActivity": {
              page: "",
              url: ""
            }
          }
        });

      }
    }
  });

});
