Meteor.startup(function() {

  // Perform any migrations specified in migrations.js
  // See https://github.com/percolatestudio/meteor-migrations
  if (!process.env.IS_MIRROR) {
    Migrations.migrateTo('latest');
    // Migrations.migrateTo(7);
  }

  //Keep tenant information sync'ed
  var tenants = Tenants.find({}).fetch();

  _.forEach(tenants, function(t) {

    if (typeof t.settings === "undefined") {
      Tenants.update(t._id, {
        $set: {
          settings: tenancyDefaultSettings
        }
      });
    }

    if (typeof t.settings.extInfo === "undefined") {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo": {
            company: [],
            contact: []
          }
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
