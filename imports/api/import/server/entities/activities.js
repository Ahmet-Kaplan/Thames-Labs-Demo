export const importActivity = (row, getValueForField, userId) => {
  const result = {};
  result.warning = [];

  //Get linked entities
  let recordType = getValueForField(row, 'recordType');
  if (recordType !== null) recordType = recordType.toLowerCase();
  let entity = {};
  let entityName = getValueForField(row, 'record');

  switch (recordType.toLowerCase()) {
    case 'company':
      recordType = 'companies';
      break;
    case 'contact':
      recordType = 'contacts';
      break;
    case 'opportunity':
      recordType = 'opportunities';
      break;
    case 'project':
      recordType = 'projects';
      break;
    case 'purchaseorder':
      recordType = 'purchaseorders';
      break;
    case 'task':
      recordType = 'tasks';
      break;
  }

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
    let notesValue = getValueForField(row, 'notes');
    if (notesValue) notesValue = notesValue.slice(0, 25);
    else notesValue = "";

    result.error = `Could not find entity "${entityName}" for activity "${notesValue}..."`;
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

  try {
    //Insert the record
    const entityId = Activities.insert(entityData, function(error, docId) {
      if (error) {
        result.error = error;
        return result;
      }
    });

    result._id = entityId;

    //Add tags
    const tags = getValueForField(row, 'tags');
    if (tags) {
      const tagList = _.split(tags, ',');
      _.each(tagList, function(tag) {
        Activities.addTag(tag, { _id: entityId });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
