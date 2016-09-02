import { Companies, Contacts } from '/imports/api/collections.js';
import { importCustomFields } from './custom-fields.js';

export const importContact = (row, getValueForField, userId, rtId, globalCustomFields, localCustomFields) => {
  const result = {};
  result.warning = [];

  //Check for company
  let companyId = null;
  const companyName = getValueForField(row, 'companyName');
  if (companyName) {
    const company = Companies.findOne({
      name: companyName
    });
    if (company) companyId = company._id;
  }

  //Setup JSON object for entity
  const entityData = {
    forename: getValueForField(row, 'forename'),
    surname: getValueForField(row, 'surname'),
    jobtitle: getValueForField(row, 'jobtitle'),
    phone: getValueForField(row, 'phone'),
    mobile: getValueForField(row, 'mobile'),
    email: getValueForField(row, 'email'),
    address: getValueForField(row, 'address'),
    address2: getValueForField(row, 'address2'),
    city: getValueForField(row, 'city'),
    county: getValueForField(row, 'county'),
    postcode: getValueForField(row, 'postcode'),
    country: getValueForField(row, 'country'),
    companyId: companyId,
    createdBy: userId,
    sequencedIdentifier: rtId
  };

  //Check if an existing record exists
  if (Contacts.findOne({ forename: entityData.forename, surname: entityData.surname })) {
    result.warning.push(`A contact already exists with the name "${entityData.forename} ${entityData.surname}"`);
  }

  if (entityData.forename === null || entityData.surname === null) {
    result.error = "Contacts must have a forename and a surname";
    return result;
  }

  try {
    //Insert the record
    const entityId = Contacts.insert(entityData, function(error, docId) {
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
        Contacts.addTag(tag, { _id: entityId });
      });
    }

    importCustomFields(row, getValueForField, entityId, "contact", globalCustomFields, localCustomFields);

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
