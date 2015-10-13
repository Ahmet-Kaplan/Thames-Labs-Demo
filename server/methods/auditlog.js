Meteor.methods({

  clearAuditLog: function() {
    if (Roles.userIsInRole(this.userId, ['Administrator', 'CanDeleteEventLog']) && !Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      Partitioner.bindGroup(user.group, function() {
        AuditLog.remove({});
      });
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      Partitioner.directOperation(function() {
        AuditLog.direct.remove({});
      })
    } else {
      throw new Meteor.Error(403, 'Only administrators can clear the audit log');
    }
  },

  addEventToAuditLog: function(logLevel, logMessage, logEntityType, logEntityId, logSource, auditGuid) {

    logEntityType = (typeof logEntityType === 'undefined') ? undefined : logEntityType;
    logEntityId = (typeof logEntityId === 'undefined') ? undefined : logEntityId;

    if (!Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      if(user) {
        Partitioner.bindGroup(user.group, function() {
          AuditLog.insert({
            token: auditGuid,
            date: new Date(),
            source: logSource,
            level: logLevel,
            message: logMessage,
            user: user._id,
            entityType: logEntityType,
            entityId: logEntityId
          });
        });
      }

    } else {
      Partitioner.directOperation(function() {
        AuditLog.direct.insert({
          token: auditGuid,
          date: new Date(),
          source: logSource,
          level: logLevel,
          message: logMessage,
          user: undefined,
          entityType: logEntityType,
          entityId: logEntityId
        });
      });
    }

  }

});
