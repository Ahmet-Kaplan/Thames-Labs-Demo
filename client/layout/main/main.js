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
  });