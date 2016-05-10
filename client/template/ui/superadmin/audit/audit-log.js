Template.auditLog.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.auditLog.events({
  'click #clear-audit-log': function() {
    bootbox.confirm("Are you sure you wish to delete all log entries?", function(result) {
      if (result === true) {
        Meteor.call('clearAuditLog', function(error, result) {
          if (error) {
            logEvent('fatal', 'Could not clear the audit log: ' + error);
          } else {
            logEvent('verbose', 'Audit log cleared.');
          }
        });
        bootbox.hideAll();
      }
    });
  }
});

Template.auditLogEntry.helpers({
  friendlyDate: function() {
    return moment(this.date).format("Do MMMM YYYY, HH:mm:ss");
  },
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
