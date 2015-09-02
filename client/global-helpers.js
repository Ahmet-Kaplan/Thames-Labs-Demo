Template.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index + 1;
      return item;
    });
  }
});

Template.registerHelper('decimal', function(number) {
  if (!number) number = 0;
  return parseFloat(number).toFixed(2);
});

setRouteDetails = function(title) {
  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  if (user) {

    var profile = user.profile;
    if (profile) {
      profile.lastActivity = {
        page: title,
        url: FlowRouter.current().path
      };

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });
    }

  }
};

Template.registerHelper("setPageTitle", function() {
  var title = "";
  for (var i = 0; i<arguments.length - 1; i++) {
    title += arguments[i];
  }
  document.title = title;
  setRouteDetails(title);
});

Template.registerHelper("getDomainFromUrl", function(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
});
