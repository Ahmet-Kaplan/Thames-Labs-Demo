export const importProject = (row, getValueForField, userId, rtId) => {
  const result = {};
  result.warning = [];

  //Check if already exists
  if (Projects.findOne({
    name: getValueForField(row, 'name')
  })) {
    result.warning.push("already-exists");
  }

  //Get linked entities
  let accountManager = getValueForField(row, 'accountManager'),
      company = getValueForField(row, 'companyName'),
      contact = getValueForField(row, 'contactName'),
      staffNames = getValueForField(row, 'staff');

  if (accountManager) {
    accountManager = Meteor.users.findOne({
      "profile.name": accountManager
    });
  }

  var staffArray = [];
  if (staffNames) {
    staffNames = staffNames.split(',');
    _.each(staffNames, function(staffName) {
      const staffRecord = Meteor.users.findOne({
        "profile.name": staffName
      });
      if (staffRecord) staffArray.push(staffRecord._id);
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
  let dueDate = getValueForField(row, 'date');
  if (dueDate) dueDate = moment(dueDate, 'DD/MM/YYYY hh:mm').toDate();

  let active = getValueForField(row, 'active');
  if (active == 0) active = false;
  else active = true;

  //Setup JSON object for entity
  const entityData = {
    name: getValueForField(row, 'name'),
    description: getValueForField(row, 'description'),
    dueDate: dueDate,
    value: getValueForField(row, 'value'),
    staff: staffArray,
    active: active,
    userId: (accountManager ? accountManager._id : null),
    companyId: (company ? company._id : null),
    contactId: (contact ? contact._id : null),
    createdBy: userId,
    sequencedIdentifier: rtId
  };

  //Insert the record
  const entityId = Projects.insert(entityData, function(error, docId) {
    if (error) {
      result.error = error;
      return result;
    }
  });

  result._id = entityId;

  return result;
};
