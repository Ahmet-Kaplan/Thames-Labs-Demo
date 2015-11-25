Meteor.startup(function() {

  Accounts.validateLoginAttempt(function(parameters) {
    if (parameters.user) {
      if (!Roles.userIsInRole(parameters.user._id, ['superadmin'])) {
        if (!parameters.user.emails || !parameters.user.emails[0]) {
          parameters.allowed = false;
          parameters.error = new Meteor.Error("There seems to be a problem with your account. Please contact us on 01223 802 901.");
        }

        var canLogIn = false;
        _.each(parameters.user.emails, function(e) {
          if (e.verified === true) {
            canLogIn = true;
          }
        })

        if (canLogIn === false) {
          parameters.allowed = false;
          parameters.error = new Meteor.Error("The email address associated with your account has not been verified. You must validate it before you can login - check your email inbox.");
          return false
        }

        return true;
      } else {
        return true;
      }
    }
  });

  // Perform any migrations specified in migrations.js
  // See https://github.com/percolatestudio/meteor-migrations
  if (!process.env.IS_MIRROR) {
    Migrations.migrateTo('latest');
  }

  //Rewrite Email.send function to avoid displaying
  //the whole email in the console during tests
  if (process.env.IS_MIRROR) {
    Email = {
      send: function(options) {
        if (options.text) {
          console.log("\t---------- Sending Email ----------");
          console.log("\tFrom: \t\t" + options.from);
          console.log("\tTo: \t\t" + options.to);
          console.log("\tSubject: \t\t" + options.subject);
          console.log("\tText: \t\t" + options.text);
          console.log("\t---------- Email end ----------");
        } else {
          console.log("\t---------- Sending Email ----------");
          console.log("\tFrom: \t\t" + options.from);
          console.log("\tTo: \t\t" + options.to);
          console.log("\tSubject: \t" + options.subject);
          console.log("\tHTML email content not displayed");
          console.log("\t---------- Email end ----------");
        }
      }
    }
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
            contact: [],
            project: []
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

      if (typeof u.profile.poAuthLevel === "undefined") {

        Meteor.users.update(u._id, {
          $set: {
            "profile.poAuthLevel": 100000
          }
        });

      }
    }
  });

  //Keep purchase order information sync'ed
  Partitioner.directOperation(function() {
    var pos = PurchaseOrders.find({}).fetch();

    _.forEach(pos, function(po) {

      if (typeof po.locked === "undefined") {
        PurchaseOrders.update(po._id, {
          $set: {
            locked: false
          }
        });
      }
    });
  });

});
