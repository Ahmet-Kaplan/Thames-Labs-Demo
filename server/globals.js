LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  logEntityType = (typeof logEntityType === 'undefined') ? undefined : logEntityType;
  logEntityId = (typeof logEntityId === 'undefined') ? undefined : logEntityId;

  // Need to do a direct operation as we're operating on behalf of the server
  // and don't have a tenant
  Partitioner.directOperation(function() {
    AuditLog.insert({
      date: new Date(),
      source: 'server',
      level: logLevel,
      message: logMessage,
      user: undefined,
      entityType: logEntityType,
      entityId: logEntityId
    });
  });
};
