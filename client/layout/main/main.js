Template.AppLayout.helpers({
  maintenanceMode: function() {
    return ServerSession.get('maintenance') && !Roles.userIsInRole(Meteor.userId(), ['superadmin']);
  }
});
