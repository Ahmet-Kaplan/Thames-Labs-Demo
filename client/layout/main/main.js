Template.AppLayout.helpers({
  hasMenu: function() {
    var loggedIn = (Meteor.userId() ? true : false);
    var isUserAdmin = Roles.userIsInRole(Meteor.user(), ['superadmin']);
    if (isUserAdmin){
      return false;
    }
    else if(!loggedIn) {
      return false;
    }
    else {
      return true;
    }
  },
  maintenanceMode: function() {
    return ServerSession.get('maintenance') && !Roles.userIsInRole(Meteor.userId(), ['superadmin']);
  }
});
