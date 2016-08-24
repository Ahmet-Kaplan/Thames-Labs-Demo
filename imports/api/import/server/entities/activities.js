export const importActivity = (row, getValueForField, userId) => {
  const result = {};
  result.warning = [];

  //Get linked entities
  const recordType = getValueForField(row, 'recordType').toLowerCase();
  let entity = {};
  let entityName = "";
  switch (recordType) {
    case 'company':
      entity = Companies.findOne({
        name: getValueForField(row, 'record')
      });
      if (entity) entityName = entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne({
        forename: getValueForField(row, 'record').split(' ')[0],
        surname: getValueForField(row, 'record').split(' ')[1]
      });
      if (entity) entityName = `${entity.forename} ${entity.surname}`;
      break;
    case 'opportunity':
      entity = Opportunities.findOne({
        name: getValueForField(row, 'record')
      });
      if (entity) entityName = entity.name;
      break;
    case 'project':
      entity = Projects.findOne({
        name: getValueForField(row, 'record')
      });
      if (entity) entityName = entity.name;
      break;
    case 'purchaseOrder':
      entity = PurchaseOrders.findOne({
        description: getValueForField(row, 'record')
      });
      if (entity) entityName = entity.description;
      break;
    case 'task':
      entity = Tasks.findOne({
        title: getValueForField(row, 'record')
      });
      if (entity) entityName = entity.title;
      break;
  }
  if (!entity) {
    result.error = `Could not find entity "${getValueForField(row, 'record')}" for activity "${getValueForField(row, 'notes')}"`;
    return result;
  }

  //Get dates
  let activityTimestamp = getValueForField(row, 'date');
  if (activityTimestamp) activityTimestamp = moment(activityTimestamp, 'DD/MM/YYYY hh:mm').toDate();

  //Setup JSON object for entity
  const entityData = {
    type: getValueForField(row, 'type'),
    notes: getValueForField(row, 'notes'),
    activityTimestamp: activityTimestamp,
    status: getValueForField(row, 'status'),
    primaryEntityType: recordType,
    primaryEntityId: entity._id,
    primaryEntityDisplayData: entityName,
    companyId: (recordType === "company" ? entity._id : null),
    contactId: (recordType === "contact" ? entity._id : null),
    projectId: (recordType === "project" ? entity._id : null),
    purchaseOrderId: (recordType === "purchaseOrder" ? entity._id : null),
    opportunityId: (recordType === "opportunity" ? entity._id : null),
    taskId: (recordType === "task" ? entity._id : null),
    createdBy: userId,
    createdAt: new Date()
  };

  //Insert the record
  const entityId = Activities.insert(entityData, function(error, docId) {
    if (error) {
      result.error = error;
      return result;
    }
  });

  result._id = entityId;

  return result;
};
