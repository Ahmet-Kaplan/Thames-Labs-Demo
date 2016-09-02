import { CustomFields } from '/imports/api/collections.js';
export const importCustomFields = (row, getValueForField, entityId, entityType, globalCustomFields, localCustomFields) => {
  const result = {};
  //Add local custom fields
  if (localCustomFields.length > 0) {
    _.each(localCustomFields, function(field, i) {
      const fieldValue = getValueForField(row, field.schemaField);
      if (fieldValue) {
        CustomFields.insert({
          name: field.fieldLabel,
          value: fieldValue,
          type: 'text',
          global: false,
          order: i,
          target: entityType,
          entityId: entityId
        });
      }
    });
  }

  //Add global custom fields
  if (globalCustomFields.length > 0) {
    _.each(globalCustomFields, function(field, i) {
      //Todo: handle different data type validation
      CustomFields.update({
        name: field.fieldLabel,
        global: true,
        target: entityType,
        entityId: entityId
      }, {
        $set: {
          value: getValueForField(row, field.schemaField),
        }
      });
    });
  }
  return result;
};