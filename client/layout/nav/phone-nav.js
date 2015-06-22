Template.phoneNav.helpers({
  favourites: function() {
    return null;
  },
  loggedIn: function() {
    return (Meteor.userId() ? true : false);
  }
});

Template.phoneNav.events({
  'click a': function() {
    var navMain = $("#mobileMenu");
    navMain.collapse('hide');
  }
});
