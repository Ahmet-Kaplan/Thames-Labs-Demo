import { Products } from '/imports/api/collections.js';

export const importProduct = (row, getValueForField, userId, rtId) => {
  const result = {};

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
    result.warning = "product-exists";
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
    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
