import { importSchema } from '/imports/api/import/field-lookup.js';

//Returns entity schema specific to tenant (includes global custom fields)
export const getFullImportSchema = (entityType, callback) => {
  //Deep copy import schema to avoid manipuating the lookup variable
  const fullSchema = _.clone(importSchema[entityType], true);

  //Load global custom fields for entityType
  let entityTypeSingular;
  switch(entityType) {
    case 'companies':
      entityTypeSingular = 'company';
      break;
    case 'contacts':
      entityTypeSingular = 'contact';
      break;
    case 'projects':
      entityTypeSingular = 'project';
      break;
    case 'products':
      entityTypeSingular = 'product';
      break;
  }
  if (entityTypeSingular) {
    //Get custom fields from db, is asynchronous so using callback() when done.
    Meteor.call('customFields.getGlobalsByTenantEntity', Meteor.user().group, entityTypeSingular, (err, res) => {
      _.each(res, (field) => {
        if (field.type !== "label") {
          const schemaField = {
            fieldLabel: field.name,
            fieldIdentifier: field._id,
            fieldOptions: [field.name, field.name.toLowerCase()],
            fieldType: 'globalCustomField',
            required: false,
          };
          fullSchema.push(schemaField);
        }
      });
      callback(fullSchema);
    });
  } else callback(fullSchema);
};


export const mapCsvFieldsToImportSchema = (csvFields, fullImportSchema) => {
  const mappedFields = [];

  //Find matches between csv fields and import schema
  _.each(fullImportSchema, (schemaField) => {
    _.each(csvFields, (csvField) => {
      if (schemaField.fieldOptions.indexOf(csvField.toLowerCase()) != -1) {
        mappedFields.push({
          importField: csvField,
          schemaField: schemaField.fieldIdentifier,
          fieldType: schemaField.fieldType,
          fieldLabel: schemaField.fieldLabel
        });
      }
    });
  });

  return mappedFields;
};

export const mapUnusedCsvFieldsToCustomFields = (csvFields, currentFieldMap) => {
  _.each(csvFields, (csvField) => {
    const map = _.find(currentFieldMap, {importField: csvField});
    if (!map) {
      currentFieldMap.push({
        importField: csvField,
        schemaField: csvField,
        fieldLabel: csvField,
        fieldType: "localCustomField"
      });
    }
  });
  return currentFieldMap;
};