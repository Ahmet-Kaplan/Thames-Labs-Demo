import { PurchaseOrders } from '/imports/api/collections.js';
Meteor.startup(function() {
  if (Meteor.isDevelopment) {
    //Rewrite Email.send function to avoid displaying
    //the whole email in the console during tests
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
    };
  }

  if (!process.env.CI) {
    // Perform any migrations specified in migrations.js
    // See https://github.com/percolatestudio/meteor-migrations
    Migrations.migrateTo('latest');
  }

  //Keep users information sync'ed
  var users = Meteor.users.find({}).fetch();

  _.forEach(users, function(u) {
    if (u.profile) {

      if (!u.profile.lastLogin) {

        Meteor.users.update(u._id, {
          $set: {
            "profile.lastLogin": new Date()
          }
        });

      }

      if (!u.profile.lastActivity) {

        Meteor.users.update(u._id, {
          $set: {
            "profile.lastActivity": {
              page: "",
              url: ""
            }
          }
        });

      }

      if (!u.profile.poAuthLevel) {

        Meteor.users.update(u._id, {
          $set: {
            "profile.poAuthLevel": 100000
          }
        });

      }
    }
  });

  // // Clear any event logs older than X days old
  // var days = 45;
  // Meteor.call('eventLog.clearRecentEvents', days, function(err, res) {
  //   if (err) throw new Meteor.Error(err);
  //   if (res) {
  //     var cutOffTime = moment().subtract(days, 'days').format('Do MMMM YYYY, HH:mm');
  //     console.log("Removed " + res + " events from the event log (cut-off period: " + cutOffTime + ")");
  //   }
  // });

});