import { Companies, Contacts, Opportunities } from '/imports/api/collections.js';
export const importOpportunity = (row, getValueForField, userId, rtId) => {
  const result = {};
  result.warning = [];

  //Check if opp already exists
  if (Opportunities.findOne({
    name: getValueForField(row, 'name')
  })) {
    result.warning.push("already-exists");
  }

  //Get linked entities
  let salesManager = getValueForField(row, 'salesManager'),
      company = getValueForField(row, 'companyName'),
      contact = getValueForField(row, 'contactName');

  if (salesManager) {
    salesManager = Meteor.users.findOne({
      "profile.name": salesManager
    });
  }

  if (company) {
    company = Companies.findOne({
      name: company
    });
    if (!company) {
      company = null;
      result.warning.push("linked-company");
    }
  }

  if (contact) {
    contact = Contacts.findOne({
      forename: contact.split(' ')[0],
      surname: contact.split(' ')[1]
    });
    if (!contact) {
      contact = null;
      result.warning.push("linked-contact");
    }
  }

  //Get dates
  let date = getValueForField(row, 'date');
  if (date) date = moment(date, 'DD/MM/YYYY hh:mm').toDate();

  let estCloseDate = getValueForField(row, 'estCloseDate');
  if (estCloseDate) estCloseDate = moment(estCloseDate, 'DD/MM/YYYY hh:mm').toDate();

  let isArchived = getValueForField(row, 'isArchived');
  if (isArchived == 1 || isArchived == "Yes") isArchived = true;
  else isArchived = false;

  let desc = getValueForField(row, 'description');
  //Hack to ensure row is imported without a description
  if (!desc) desc = `Imported on ${ moment().format('DD/MM/YYYY')}`;

  //Setup JSON object for entity
  const entityData = {
    name: getValueForField(row, 'name'),
    description: desc,
    date: date,
    estCloseDate: estCloseDate,
    value: getValueForField(row, 'value'),
    isArchived: isArchived,
    companyId: (company ? company._id : null),
    contactId: (contact ? contact._id : null),
    salesManagerId: (salesManager ? salesManager._id : null),
    createdBy: userId,
    sequencedIdentifier: rtId
  };

  //Set hasBeenWon field - needs to be undefined if not strictly set
  const hasBeenWon = getValueForField(row, 'hasBeenWon');
  if (hasBeenWon == 1 || hasBeenWon == "Yes") entityData.hasBeenWon = true;
  if (hasBeenWon == 0 || hasBeenWon == "No") entityData.hasBeenWon = false;

  try {
    //Insert the record
    const entityId = Opportunities.insert(entityData, function(error, docId) {
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
        Opportunities.addTag(tag, { _id: entityId });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
