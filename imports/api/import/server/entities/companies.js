export const importCompany = (row, getValueForField, userId, rtId, globalCustomFields) => {
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

    //Add local custom fields
    /*if (localCustomFields.length > 0) {
      _.each(localCustomFields, function(field, i) {
        if (row[field].length > 0) {
          CustomFields.insert({
            name: field,
            value: (row[field] ? row[field] : ''),
            type: 'text',
            global: false,
            order: i,
            target: 'company',
            entityId: entityId
          }, function(cfErr) {
            if (cfErr) result.warning = "custom-fields";
          });
        }
      });
    } */

    //Add global custom fields
    if (globalCustomFields.length > 0) {
      _.each(globalCustomFields, function(field, i) {
        console.log(field);
        console.log(getValueForField(row, field.schemaField));
        CustomFields.update({
          name: field.fieldLabel,
          global: true,
          target: 'company',
          entityId: entityId
        }, {
          $set: {
            value: getValueForField(row, field.schemaField),
          }
        });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
