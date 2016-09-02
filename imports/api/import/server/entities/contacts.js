import { Companies, Contacts, CustomFields } from '/imports/api/collections.js';
export const importContact = (row, getValueForField, userId, rtId, localCustomFields) => {
  const result = {};

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
    result.warning = "contact-exists";
  }

  if (entityData.forename === null || entityData.surname === null) {
    result.error = "Contact must have a forename and a surname";
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

    //Add local custom fields
    if (localCustomFields.length > 0) {
      _.each(localCustomFields, function(field, i) {
        if (row[field].length > 0) {
          CustomFields.insert({
            name: field,
            value: (row[field] ? row[field] : ''),
            type: 'text',
            global: false,
            order: i,
            target: 'contact',
            entityId: entityId
          }, function(cfErr) {
            if (cfErr) result.warning = "custom-fields";
          });
        }
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
