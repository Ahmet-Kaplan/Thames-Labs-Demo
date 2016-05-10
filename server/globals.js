LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('addEventToAuditLog', logLevel, logMessage, logEntityType, logEntityId, 'server', Guid.raw());
};