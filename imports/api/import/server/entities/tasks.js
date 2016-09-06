import { Contacts, Tasks } from '/imports/api/collections.js';
export const importTask = (row, getValueForField, userId, rtId) => {
  const result = {};

  //Check if referenced assignee exists
  const assignee = Meteor.users.findOne({
    "profile.name": getValueForField(row, 'assignee')
  });

  if (!assignee) {
    result.error = `Assigned user does not exist`;
    return result;
  }

  //Check if referenced entity exists
  let entity = null;
  const recordType = getValueForField(row, 'recordType');
  const record = getValueForField(row, 'record');
  if (recordType === 'user') {
    entity = Meteor.users.findOne({
      "profile.name": record
    });
  } else if (recordType !== 'contact') {
    let collectionName = null;
    switch (recordType) {
      case 'company':
        collectionName = 'companies';
        break;
      case 'opportunity':
        collectionName = 'opportunities';
        break;
      case 'project':
        collectionName = 'projects';
        break;
    }
    entity = Collections[collectionName].findOne({
      name: record
    });
  } else {
    const contactName = record;
    entity = Contacts.findOne({
      forename: contactName.split(' ')[0],
      surname: contactName.split(' ')[1]
    });
  }

  if (!entity) {
    result.error = `Could not find a "${getValueForField(row, 'recordType')}" record called "${getValueForField(row, 'record')}"`;
    return result;
  }

  let dueDate = getValueForField(row, 'dueDate');
  if (dueDate) dueDate = moment(dueDate, 'DD/MM/YYYY hh:mm').toDate();

  //Setup JSON object for entity
  const entityData = {
    title: getValueForField(row, 'title'),
    description: getValueForField(row, 'description'),
    dueDate: dueDate,
    assigneeId: assignee._id,
    completed: false,
    entityType: getValueForField(row, 'recordType'),
    entityId: entity._id,
    createdBy: userId,
    sequencedIdentifier: rtId
  };
  try {
    //Insert the record
    const entityId = Tasks.insert(entityData, function(error, docId) {
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
        Tasks.addTag(tag, { _id: entityId });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
