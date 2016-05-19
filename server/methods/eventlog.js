Meteor.methods({

  clearRecentEvents: function(days) {
    var cutOffTime = moment().subtract(days, 'days');
    return EventLog.remove({
      date: {
        $lt: cutOffTime
      }
    });
  },

  clearEventLog: function() {
    if (Roles.userIsInRole(this.userId, ['CanDeleteEventLog', 'Administrator']) && !Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      // EventLog collection is not partitioned. Cannot use Partitioner.bindGroup.
      EventLog.remove({
        group: user.group
      });
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      EventLog.direct.remove({});
    } else {
      throw new Meteor.Error(403, 'Only administrators can clear the event log');
    }
  },

  addEventToEventLog: function(logLevel, logMessage, logEntityType, logEntityId, logSource) {

    logEntityType = (typeof logEntityType === 'undefined') ? undefined : logEntityType;
    logEntityId = (typeof logEntityId === 'undefined') ? undefined : logEntityId;

    var userName = "superadmin";
    var tenantName = null;
    var userGroup = null;

    if (!Roles.userIsInRole(this.userId, 'superadmin')) {
      var user = Meteor.users.findOne({
        _id: this.userId
      });

      if (user) {
        userName = user.profile.name;
        var tenant = Tenants.findOne({
          _id: user.group
        });

        if (tenant) {
          tenantName = tenant.name;
          userGroup = tenant._id;
        }
      }

      EventLog.insert({
        date: new Date(),
        source: logSource,
        level: logLevel,
        message: logMessage,
        user: userName,
        entityType: logEntityType,
        entityId: logEntityId,
        tenant: tenantName,
        group: userGroup
      });
    }
  }
});