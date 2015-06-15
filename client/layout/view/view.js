Template.view.helpers({
  favourites: function() {
    return null;
  },
  loggedIn: function() {
    return (Meteor.userId() ? true : false);
  }
});
