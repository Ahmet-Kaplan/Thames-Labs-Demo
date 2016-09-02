import { Companies } from '/imports/api/collections.js';
export const importCompany = (row, getValueForField, userId, rtId) => {
  const result = {};

  //Check formatting of web address
  let website = getValueForField(row, 'website');
  if (website) {
    const rx = new RegExp(/(^$)|((https?:\/\/)?([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})([\/\w \.-]*)*\/?)/);
    website = (rx.test(website) === false ? '' : website);
  }

  //Setup JSON object for company entity
  const entityData = {
    name: getValueForField(row, 'name'),
    address: getValueForField(row, 'address'),
    address2: getValueForField(row, 'address2'),
    city: getValueForField(row, 'city'),
    county: getValueForField(row, 'county'),
    postcode: getValueForField(row, 'postcode'),
    country: getValueForField(row, 'country'),
    website: website,
    phone: getValueForField(row, 'phone'),
    createdBy: userId,
    sequencedIdentifier: rtId
  };

  //Check if an existing company exists
  if (Companies.findOne({ name: entityData.name })) {
    result.warning = "company-exists";
  }

  try {
    //Insert the company
    const entityId = Companies.insert(entityData, function(error, docId) {
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
        Companies.addTag(tag, { _id: entityId });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
