import './favourites.html';

Template.favourites.helpers({
  favourites: function() {
    var ux = Meteor.users.findOne(Meteor.userId());

    if (ux) {
      var profile = ux.profile;
      if (!profile.favourites) {
        return null;
      }
      return profile.favourites;
    }
  }
});