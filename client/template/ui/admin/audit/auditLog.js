Template.auditLog.helpers({
  auditLogs: function() {    
    return AuditLog.find({});
  }
});

Template.auditLogEntry.helpers({
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
