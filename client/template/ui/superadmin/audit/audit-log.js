import bootbox from 'bootbox';
Template.eventLog.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.eventLog.events({
  'click #clear-event-log': function() {
    bootbox.confirm("Are you sure you wish to delete all log entries?", function(result) {
      if (result === true) {
        Meteor.call('clearEventLog', function(error, result) {
          if (error) {
            LogClientEvent(LogLevel.Error, "An error occurred whilst attempting to clear the event log: " + error, null, null);
          } else {
            LogClientEvent(LogLevel.Info, "Super-admin user cleared the event logs", null, null);
          }
        });
        bootbox.hideAll();
      }
    });
  }
});

Template.eventLogEntry.helpers({
  displayLevel: function() {
    var returnedData;

    switch (this.level) {
      case 'fatal':
        returnedData = "<div id='logLevel'><span class='label label-primary'>fatal</span></div>";
        break;
      case 'error':
        returnedData = "<div id='logLevel'><span class='label label-danger'>error</span></div>";
        break;
      case 'warning':
        returnedData = "<div id='logLevel'><span class='label label-warning'>warning</span></div>";
        break;
      case 'info':
        returnedData = "<div id='logLevel'><span class='label label-info'>info</span></div>";
        break;
      case 'verbose':
        returnedData = "<div id='logLevel'><span class='label label-success'>verbose</span></div>";
        break;
      case 'debug':
        returnedData = "<div id='logLevel'><span class='label label-default'>debug</span></div>";
        break;
    }

    return returnedData;
  }
});
