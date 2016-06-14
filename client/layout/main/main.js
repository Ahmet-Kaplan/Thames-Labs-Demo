Template.appLayout.helpers({
  hasMenuClass: function() {
    // var loggedIn = (Meteor.userId() ? true : false);
    if (!Meteor.userId()) {
      return 'no-menu';
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
  if (bowser.mobile || Meteor.isCordova) {
    $("#id-view-content").swipe({
      swipeLeft: function(event) {
        console.log('swiped left');
        document.getElementById("id-view-sidemenu").className = "";
      },
      swipeRight: function(event) {
        console.log('swiped right');
        document.getElementById("id-view-sidemenu").className = "active";
      },
      threshold: 75
    });
  }
});
Template.appLayout.onCreated(function() {
  this.autorun(function() {
    if (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), ['superadmin']) && Meteor.isProduction) {
      $.getScript('https://embed.tawk.to/56b333a5fe87529955d980fa/default');
    }
  });
});
