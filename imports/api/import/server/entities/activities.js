import { Activities, Companies, Contacts, Jobs, Tasks } from '/imports/api/collections.js';

export const importActivity = (row, getValueForField, userId) => {
  const result = {};
  result.warning = [];

  //Get linked entities
  let recordType = getValueForField(row, 'recordType');
  if (recordType !== null) recordType = recordType.toLowerCase();
  else {
    let notesValue = getValueForField(row, 'notes');
    if (notesValue) notesValue = notesValue.slice(0, 25);
    else notesValue = "";
    result.error = `Cannot find associated record for activity "${notesValue}"`;
  }
  let entity = {};
  let entityName = getValueForField(row, 'record');

  switch (recordType) {
    case 'company':
      recordType = 'companies';
      break;
    case 'contact':
      recordType = 'contacts';
      break;
    case 'job':
      recordType = 'jobs';
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
    case 'job':
      entity = Jobs.findOne({
        name: entityName
      });
      if (entity) entityName = entity.name;
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

    result.error = `Cannot find an associated record called "${entityName}" for activity "${notesValue}..."`;
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
    jobId: (recordType === "jobs" ? entity._id : null),
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
