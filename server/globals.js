Sortable.collections = ['opportunitystages'];

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

defaultPermissionsList = [
  "CanReadContacts",
  "CanReadCompanies",
  "CanCreateCompanies",
  "CanEditCompanies",
  "CanDeleteCompanies",
  "CanCreateContacts",
  "CanEditContacts",
  "CanDeleteContacts",
  "CanReadProjects",
  "CanCreateProjects",
  "CanEditProjects",
  "CanDeleteProjects",
  "CanReadProducts",
  "CanCreateProducts",
  "CanEditProducts",
  "CanDeleteProducts",
  "CanReadTasks",
  "CanCreateTasks",
  "CanEditTasks",
  "CanDeleteTasks",
  "CanReadPurchaseOrders",
  "CanCreatePurchaseOrders",
  "CanEditPurchaseOrders",
  "CanDeletePurchaseOrders",
  "CanReadDataManagement",
  "CanCreateDataManagement",
  "CanEditDataManagement",
  "CanDeleteDataManagement",
  "CanReadEventLog",
  "CanCreateEventLog",
  "CanEditEventLog",
  "CanDeleteEventLog",
  "CanReadOpportunities",
  "CanCreateOpportunities",
  "CanEditOpportunities",
  "CanDeleteOpportunities"
];
