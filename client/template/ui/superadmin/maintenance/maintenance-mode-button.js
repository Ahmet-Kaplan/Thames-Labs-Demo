import bootbox from 'bootbox';
Template.maintenanceModeButton.helpers({
  maintenanceMode: function() {
    return ServerSession.get('maintenance');
  }
});

Template.maintenanceModeButton.events({
  'click button': function() {
    if (ServerSession.get('maintenance') === true) {
      Meteor.call('setMaintenanceMode', false);
    } else {
      bootbox.confirm("Are you sure you wish to enable maintenance mode?", function(result) {
        if (result === true) {
          Meteor.call('setMaintenanceMode', true);
        }
      });
    }
  }
});
