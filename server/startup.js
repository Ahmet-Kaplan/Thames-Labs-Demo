Meteor.startup(function() {
  //Keep tenant information sync'ed
  var tenants = g_Tenants.find({
    settings: {
      $exists: 0
    }
  }).fetch();

  _.forEach(tenants, function(t) {

    if (typeof t.settings === "undefined") {
      g_Tenants.update(t._id, {
        $set: {
          settings: tenancyDefaultSettings
        }
      });
    }
  });

});
