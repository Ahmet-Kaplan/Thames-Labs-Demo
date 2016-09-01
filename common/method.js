import { Activities, Projects, Opportunities, Tasks, Tenants } from '/imports/api/collections.js';
import '/imports/api/reports/reporting.js';
import '/imports/api/tawk-to/tawk-to-methods.js';

Meteor.methods({

  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  },

  winOpportunity: function(opp, projType) {
    var user = Meteor.user();
    var val = opp.value;
    if (!val) {
      val = 0;
    }
    var projId = Projects.insert({
      name: opp.name,
      description: opp.description,
      companyId: opp.companyId,
      contactId: opp.contactId,
      userId: user._id,
      value: val,
      createdBy: user._id,
      projectTypeId: projType,
      projectMilestoneId: 0,
      sequencedIdentifier: Tenants.findOne({
        _id: user.group
      }).settings.project.defaultNumber
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of Project from won opportunity ['" + opp.name + "'] failed: " + err, "opportunity", opp._id);
        return;
      }
    });

    if (opp.items) {
      for (var i = 0; i < opp.items.length; i++) {
        var title = opp.items[i].name;
        var description = opp.items[i].description + " Value: " + opp.items[i].value + " Quantity: " + opp.items[i].quantity;
        Tasks.insert({
          title: title,
          description: description,
          assigneeId: user._id,
          createdBy: user._id,
          entityType: 'project',
          entityId: projId
        }, function(err) {
          if (err) {
            LogClientEvent(LogLevel.Error, "Auto-creation of Project task from won opportunity item ['" + title + "'] failed: " + err, "project", projId);
          }
        });
      }
    }

    Opportunities.update(opp._id, {
      $set: {
        isArchived: true,
        hasBeenWon: true,
        projectId: projId,
        currentStageId: null
      }
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-archiving of won opportunity ['" + opp.name + "'] failed: " + err, "opportunity", opp._id);
      }
    });

    var note = user.profile.name + ' marked this opportunity as won';
    var date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      opportunityId: opp._id,
      primaryEntityId: opp._id,
      primaryEntityType: 'opportunities',
      primaryEntityDisplayData: opp.name,
      createdBy: user._id
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of won opportunity ['" + opp.name + "'] activity entry failed: " + err, "opportunity", opp._id);
      }
    });

    note = 'Converted from won opportunity "' + opp.name + '"';
    date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      projectId: projId,
      primaryEntityId: projId,
      primaryEntityType: 'projects',
      primaryEntityDisplayData: opp.name,
      createdBy: user._id
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of project ['" + opp.name + "'] activity entry on upgrading from opportunity failed: " + err, "project", projId);
      }
    });

    LogClientEvent(LogLevel.Info, "Auto-creation of project ['" + opp.name + "'] from won opportunity succeeded", "project", projId);
    return projId;
  }
});

LogClientEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  if (Meteor.isServer) {
    Meteor.call('eventLog.addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'client');
  }
};

LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('eventLog.addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'server');
};
