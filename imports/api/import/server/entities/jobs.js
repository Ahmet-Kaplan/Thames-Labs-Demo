import { Companies, Contacts, Jobs } from '/imports/api/collections.js';
import { importCustomFields } from './custom-fields.js';

export const importJob = (row, getValueForField, userId, rtId, globalCustomFields, localCustomFields) => {
  const result = {};
  result.warning = [];

  //Check if already exists
  if (Jobs.findOne({
    name: getValueForField(row, 'name')
  })) {
    result.warning.push(`A job already exists with the name "${getValueForField(row, 'name')}"`);
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
      result.warning.push(`Cannot find referenced company "${getValueForField(row, 'companyName')}" for job "${getValueForField(row, 'name')}"`);
    }
  }

  if (contact) {
    const names = contact.split(' ');
    let fn, sn;
    if (names.length === 2) {
      fn = names[0];
      sn = names[1];
    } else if (names.length > 2) {
      fn = names[0];
      sn = "";

      for(let i = 1; i < names.length; i++) {
        sn = sn + names[i] + " ";
      }
      sn = sn.trim();
    }

    contact = Contacts.findOne({
      forename: fn,
      surname: sn
    });
    if (!contact) {
      contact = null;
      result.warning.push(`Cannot find referenced contact "${getValueForField(row, 'contactName')}" for job "${getValueForField(row, 'name')}"`);
    }
  }

  //Get dates
  let dueDate = getValueForField(row, 'date');
  if (dueDate) dueDate = moment(dueDate, 'DD/MM/YYYY hh:mm').toDate();

  let active = getValueForField(row, 'active');
  if (active == 0 || active == "No") active = false;
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

  try {
    //Insert the record
    const entityId = Jobs.insert(entityData, function(error, docId) {
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
        Jobs.addTag(tag, { _id: entityId });
      });
    }

    importCustomFields(row, getValueForField, entityId, "job", globalCustomFields, localCustomFields);

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
