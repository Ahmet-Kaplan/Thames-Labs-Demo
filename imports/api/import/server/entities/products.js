import { Products } from '/imports/api/collections.js';
import { importCustomFields } from './custom-fields.js';

export const importProduct = (row, getValueForField, userId, rtId, globalCustomFields, localCustomFields) => {
  const result = {};
  result.warning = [];

  //Setup JSON object for entity
  const entityData = {
    name: getValueForField(row, 'name'),
    description: getValueForField(row, 'description'),
    price: getValueForField(row, 'price'),
    cost: getValueForField(row, 'cost'),
    createdBy: userId,
    sequencedIdentifier: rtId
  };

  //Check if an existing record exists
  if (Products.findOne({ name: entityData.name })) {
    result.warning.push(`A product already exists with the name "${entityData.name}"`);
  }
  try {
    //Insert the record
    const entityId = Products.insert(entityData, function(error, docId) {
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
        Products.addTag(tag, { _id: entityId });
      });
    }

    importCustomFields(row, getValueForField, entityId, "product", globalCustomFields, localCustomFields);

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
