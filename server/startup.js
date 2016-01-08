Meteor.startup(function() {

  if (process.env.IS_MIRROR || process.env.CI) {
    // Things to do ONLY IN test environment

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
  } else {
    // Things to do ONLY OUTSIDE of test environment

    // Perform any migrations specified in migrations.js
    // See https://github.com/percolatestudio/meteor-migrations
    Migrations.migrateTo('latest');
  }

  //Keep tenant information sync'ed
  var tenants = Tenants.find({}).fetch();

  _.forEach(tenants, function(t) {

    if (!t.settings) {
      Tenants.update(t._id, {
        $set: {
          settings: tenancyDefaultSettings
        }
      });
    }

    if (!t.settings.opportunity) {
      Tenants.update(t._id, {
        $set: {
          "settings.opportunity": {
            stages: []
          }
        }
      });
    }

    if (!t.settings.project) {
      Tenants.update(t._id, {
        $set: {
          "settings.project": {
            types: []
          }
        }
      });
    }

    if (!t.settings.extInfo) {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo": {
            company: [],
            contact: [],
            project: [],
            product: []
          }
        }
      });
    }

    if (!t.settings.extInfo.company) {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo.company": []
        }
      });
    }

    if (!t.settings.extInfo.contact) {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo.contact": []
        }
      });
    }

    if (!t.settings.extInfo.project) {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo.project": []
        }
      });
    }

    if (!t.settings.extInfo.product) {
      Tenants.update(t._id, {
        $set: {
          "settings.extInfo.product": []
        }
      });
    }
  });

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

  //Keep purchase order information sync'ed
  Partitioner.directOperation(function() {
    var pos = PurchaseOrders.find({}).fetch();

    _.forEach(pos, function(po) {

      if (!po.locked) {
        PurchaseOrders.update(po._id, {
          $set: {
            locked: false
          }
        });
      }
    });
  });

});
