Template.maintenanceModeButton.helpers({
  maintenanceMode: function() {
    return ServerSession.get('maintenance');
  }
});

Template.maintenanceModeButton.events({
  'click button': function() {
    Meteor.call('setMaintenanceMode', !ServerSession.get('maintenance'));
  }
});
