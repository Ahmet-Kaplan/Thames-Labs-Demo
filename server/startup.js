Meteor.startup(function() {
  var tenants = g_Tenants.find({
    settings: {
      $exists: 0
    }
  }).fetch();

  _.forEach(tenants, function(t) {

    if (typeof t.settings === "undefined") {
      console.log("No settings for " + t.name);
      g_Tenants.update(t._id, {
        $set: {
          settings: tenancyDefaultSettings
        }
      });
    }
  });
});
