Template.appLayout.helpers({
  hasMenuClass: function() {
    var loggedIn = (Meteor.userId() ? true : false);
    if (!loggedIn) {
      return 'no-menu';
    } else {
      return;
    }
  },
  maintenanceMode: function() {
    return ServerSession.get('maintenance') && !Roles.userIsInRole(Meteor.userId(), ['superadmin']);
  },
  subsReady: function() {
    return FlowRouter.subsReady();
  }
});

Template.appLayout.onRendered(function() {
  $.getScript('/vendor/bowser.min.js');
  $("#id-view-content").swipe({
    swipeLeft: function(event) {
      console.log('swiped left');
      document.getElementById("id-view-sidemenu").className = "";
    },
    swipeRight: function(event) {
      console.log('swiped right');
      document.getElementById("id-view-sidemenu").className = "active";
    },
    threshold: 75,
  });
});
