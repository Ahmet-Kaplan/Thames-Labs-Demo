import './map-fields.html';
import { getFullImportSchema, mapCsvFieldsToImportSchema } from './helpers.js';

Template.mapFields.onCreated(function() {
  this.csvFields = this.data.fields;
  this.fieldMap = this.data.fieldMap;
  this.importSchema = new ReactiveVar([]);

  //Get compiled schema with custom fields and RT fields
  getFullImportSchema(this.data.entity, (schema) => {
    this.importSchema.set(schema);
  });
});

Template.mapFields.onRendered(function() {
  this.autorun(() => {
    //Update schema if entityType is changed
    getFullImportSchema(this.data.entity, (schema) => {
      this.importSchema.set(schema);
    });
  });

  this.autorun(() => {
    //Update mapping between csv fields and schema, if either value changes
    const schema = this.importSchema.get();
    this.fieldMap.set(mapCsvFieldsToImportSchema(this.data.csvFields, schema));
    console.log(this.fieldMap.get());
  });
});