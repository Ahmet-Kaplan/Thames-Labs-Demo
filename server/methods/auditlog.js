Meteor.methods({

  clearAuditLog: function() {
    if (Roles.userIsInRole(this.userId, ['Administrator', 'CanDeleteEventLog'])) {
      AuditLog.remove({});
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      // Clear the entire audit login
      Partitioner.directOperation(function() {
        AuditLog.remove({});
      })
    } else {
      throw new Meteor.Error(403, 'Only administrators can clear the audit log');
    }
  }

});
