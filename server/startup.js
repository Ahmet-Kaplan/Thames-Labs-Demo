Meteor.startup(function() {

  // Perform any migrations specified in migrations.js
  // See https://github.com/percolatestudio/meteor-migrations
  if (!process.env.IS_MIRROR) {
    Migrations.migrateTo('latest');
  }

  //Rewrite Email.send function to avoid displaying
  //the whole email in the console during tests
  if(process.env.IS_MIRROR || Meteor.isDevelopment) {
    Email = {
      send: function(options) {
        if(options.text) {
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

      if (typeof u.profile.welcomeTour === "undefined") {

        Meteor.users.update(u._id, {
          $set: {
            "profile.welcomeTour": false
          }
        });

      }

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
