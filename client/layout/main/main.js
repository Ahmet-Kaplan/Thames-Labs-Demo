Template.appLayout.helpers({
  hasMenuClass: function() {
    var loggedIn = (Meteor.userId() ? true : false);
    var isUserAdmin = Roles.userIsInRole(Meteor.user(), ['superadmin']);
    if (isUserAdmin) {
      return 'no-menu';
    } else if(!loggedIn) {
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
