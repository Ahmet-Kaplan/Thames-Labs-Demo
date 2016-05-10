Meteor.methods({

  clearAuditLog: function() {
    if (Roles.userIsInRole(this.userId, ['CanDeleteEventLog']) && !Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      Partitioner.bindGroup(user.group, function() {
        AuditLog.remove({});
      });
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      Partitioner.directOperation(function() {
        AuditLog.direct.remove({});
        GlobalAudit.direct.remove({});
      });

    } else {
      throw new Meteor.Error(403, 'Only administrators can clear the audit log');
    }
  },

  addEventToAuditLog: function(logLevel, logMessage, logEntityType, logEntityId, logSource, auditGuid) {

    // logEntityType = (typeof logEntityType === 'undefined') ? undefined : logEntityType;
    // logEntityId = (typeof logEntityId === 'undefined') ? undefined : logEntityId;

    if (!Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      if (user) {
        var tenant = Partitioner.directOperation(function() {
          return Tenants.findOne({
            _id: user.group
          });
        });

        Partitioner.bindGroup(user.group, function() {
          AuditLog.insert({
            token: auditGuid,
            date: new Date(),
            source: logSource,
            level: logLevel,
            message: logMessage,
            user: user.profile.name,
            entityType: logEntityType,
            entityId: logEntityId
          });
        });

        GlobalAudit.insert({
          date: new Date(),
          source: logSource,
          level: logLevel,
          message: logMessage,
          user: user.profile.name,
          tenant: tenant.name
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
          user: void 0,
          entityType: logEntityType,
          entityId: logEntityId
        });
      });

      GlobalAudit.insert({
        date: new Date(),
        source: logSource,
        level: logLevel,
        message: logMessage,
        user: 'Cambridge Software Team',
        tenant: 'Super Admin'
      });
    }

  }

});
