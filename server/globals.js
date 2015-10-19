Sortable.collections = ['opportunitystages'];

LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('addEventToAuditLog', logLevel, logMessage, ((typeof logEntityType === 'undefined') ? undefined : logEntityType), ((typeof logEntityId === 'undefined') ? undefined : logEntityId), 'server', Guid.raw());
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
