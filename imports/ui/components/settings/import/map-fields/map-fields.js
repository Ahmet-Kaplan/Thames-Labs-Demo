import './map-fields.html';
import { getFullImportSchema, mapCsvFieldsToImportSchema } from './helpers.js';

Template.mapFields.onCreated(function() {
  this.fieldMap = this.data.fieldMap;
  this.schemaFields = new ReactiveVar([]);
});

Template.mapFields.onRendered(function() {
  this.autorun(() => {
    //Update schema if entityType is changed
    getFullImportSchema(this.data.entity, (schema) => {
      this.schemaFields.set(schema);
    });
  });

  this.autorun(() => {
    //Update mapping between csv fields and schema, if either value changes
    const schema = this.schemaFields.get();
    const currentFieldMap = mapCsvFieldsToImportSchema(this.data.csvFields, schema);
    this.fieldMap.set(currentFieldMap);

    //Delay to allow ui to update
    Meteor.setTimeout(() => {
      //Update UI selectpickers and select correct option from map
      $('.import-field-picker').selectpicker({
        title: 'Do not import',
        selectOnTab: true
      });
      _.each(currentFieldMap, function(field) {
        $(`#${field.schemaField}-field`).selectpicker('val', field.importField);
      });
    }, 500);
  });
});

Template.mapFields.helpers({
  schemaFields: function() {
    return Template.instance().schemaFields.get();
  },

  csvFields: function() {
    return Template.instance().data.csvFields;
  }
});

/*
$('.selectpicker.map-field').selectpicker({
        title: 'Do not import',
        selectOnTab: true
      });

      //Setup event handlers, remove old ones
      $('.field-selectpicker').off('changed.bs.select');
      $('.field-selectpicker').on('changed.bs.select', (e) => {
        //Update the mapping between importField (from csv) and schemaField
        const currentFieldMap = instance.fieldMap.get();
        const fieldArrayIndex = _.findIndex(currentFieldMap, ['schemaField', e.target.id.replace('-Selector', '')]);
        currentFieldMap[fieldArrayIndex].importField = e.target.value;
        instance.fieldMap.set(currentFieldMap);
      });

      $('.customfield-selectpicker').off('changed.bs.select');
      $('.customfield-selectpicker').on('changed.bs.select', (e) => {
        const globalCustomFields = instance.globalCustomFields.get();
        const entityGCFs = instance.entityGCFs.get();
        console.log(e);
        const customFieldId = e.target.id.replace('-CustomFieldSelector', '');
        globalCustomFields[fieldArrayIndex].importField = e.target.value;
        instance.globalCustomFields.set(globalCustomFields);
      });

      //Preselect correct fields from CSV
      const currentFieldMap = instance.fieldMap.get();
      $('.field-selectpicker').each((i, obj) => {
        const schemaFieldName = obj.id.replace('-Selector', '');
        const field = _.find(currentFieldMap, { schemaField: schemaFieldName });
        if (field) {
          $(`#${obj.id}`).selectpicker('val', field.importField);
        }
      });
      */