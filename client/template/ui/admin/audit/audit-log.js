Template.auditLog.events({
  'click #clear-audit-log': function() {
    Meteor.call('clearAuditLog', function(error, result) {
      if (error) {
        logEvent('fatal', 'Could not clear the audit log: ' + error);
      } else {
        logEvent('verbose', 'Audit log cleared.');
      }
    });
  }
});

Template.auditLog.helpers({
  auditLogs: function() {
    return AuditLog.find({});
  }
});

Template.auditLogEntry.helpers({
  friendlyDate: function() {
    return new moment(this.date).format("Do MMMM YYYY, HH:mm:ss");
  },
  userName: function() {
    if (this.user !== undefined) {

      var u = Meteor.users.findOne(this.user);
      if (u) {
        return u.profile.name + " [" + Tenants.findOne(u.group).name + "]";
      }
    }
  },
  displayLevel: function() {
    var returnedData;

    switch (this.level) {
      case 'fatal':
        returnedData = "<div><span class='label label-primary'>FATAL</span></div>";
        break;
      case 'error':
        returnedData = "<div><span class='label label-danger'>ERROR</span></div>";
        break;
      case 'warning':
        returnedData = "<div><span class='label label-warning'>WARNING</span></div>";
        break;
      case 'info':
        returnedData = "<div><span class='label label-info'>INFO</span></div>";
        break;
      case 'verbose':
        returnedData = "<div><span class='label label-success'>VERBOSE</span></div>";
        break;
      case 'debug':
        returnedData = "<div><span class='label label-default'>DEBUG</span></div>";
        break;
    }

    return returnedData;
  }
});
