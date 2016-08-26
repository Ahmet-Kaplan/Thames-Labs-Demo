export const importActivity = (row, getValueForField, userId) => {
  const result = {};
  result.warning = [];

  //Get linked entities
  const recordType = getValueForField(row, 'recordType').toLowerCase();
  let entity = {};
  let entityName = getValueForField(row, 'record');
  switch (recordType) {
    case 'companies':
      entity = Companies.findOne({
        name: entityName
      });
      if (entity) entityName = entity.name;
      break;
    case 'contacts':
      entity = Contacts.findOne({
        forename: entityName.split(' ')[0],
        surname: entityName.split(' ')[1]
      });
      if (entity) entityName = `${entity.forename} ${entity.surname}`;
      break;
    case 'opportunities':
      entity = Opportunities.findOne({
        name: entityName
      });
      if (entity) entityName = entity.name;
      break;
    case 'projects':
      entity = Projects.findOne({
        name: entityName
      });
      if (entity) entityName = entity.name;
      break;
    case 'purchaseorders':
      entity = PurchaseOrders.findOne({
        description: entityName
      });
      if (entity) entityName = entity.description;
      break;
    case 'tasks':
      entity = Tasks.findOne({
        title: entityName
      });
      if (entity) entityName = entity.title;
      break;
  }
  if (!entity) {
    result.error = `Could not find entity "${entityName}" for activity "${getValueForField(row, 'notes').slice(0, 25)}..."`;
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
    companyId: (recordType === "companies" ? entity._id : null),
    contactId: (recordType === "contacts" ? entity._id : null),
    projectId: (recordType === "projects" ? entity._id : null),
    purchaseOrderId: (recordType === "purchaseorders" ? entity._id : null),
    opportunityId: (recordType === "opportunities" ? entity._id : null),
    taskId: (recordType === "tasks" ? entity._id : null),
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
