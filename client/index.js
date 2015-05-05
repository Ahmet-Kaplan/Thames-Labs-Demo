Template.body.onRendered(function() {
  $(".button-collapse").sideNav();
});

Template.body.events({
  'click a.logout': function() {
    Meteor.logout();
    $('.button-collapse').sideNav('hide');
  }
});
