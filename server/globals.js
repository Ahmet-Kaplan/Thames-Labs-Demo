LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('addEventToAuditLog', logLevel, logMessage, ((typeof logEntityType === 'undefined') ? undefined : logEntityType), ((typeof logEntityId === 'undefined') ? undefined : logEntityId), 'server', Guid.raw());
};