Meteor.methods({
  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  }
});

GetRoutedPageTitle = function(currentName) {
  var title = currentName;
  return title.charAt(0).toUpperCase() + title.slice(1);
};

SetRouteDetails = function(title) {
  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  if (user) {

    var profile = user.profile;
    if (profile) {
      profile.lastActivity = {
        page: title,
        url: Router.current().url
      };

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });
    }

  }
};
