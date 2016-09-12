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
      const gcf = CustomFields.findOne({
        name: field.fieldLabel,
        global: true,
        target: entityType,
        entityId: entityId
      });
      if (gcf) {
        let val = getValueForField(row, field.schemaField);
        if (gcf.type == "checkbox") {
          if (val == "true" || val == "TRUE" || val == "True" || val == "1" || val == "Yes" || val == "yes") val = "true";
          else val = "false";
        }
        CustomFields.update(gcf._id, {
          $set: {
            value: val,
          }
        });
      }
    });
  }
  return result;
};