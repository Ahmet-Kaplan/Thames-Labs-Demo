Meteor.methods({

  setMaintenanceMode: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('maintenance', val);
    if (val === true) {
      LogServerEvent('warning', 'Maintenance mode enabled');
    } else {
      LogServerEvent('info', 'Maintenance mode disabled');
    }
  }

});
