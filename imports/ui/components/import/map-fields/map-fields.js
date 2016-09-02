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


      //Add selectpicker event handlers
      $('.import-field-picker').off('changed.bs.select');
      $('.import-field-picker').on('changed.bs.select', (e) => {
        const schemaField = e.target.id.replace('-field', '');
        const mapIndex = _.findIndex(currentFieldMap, { schemaField: schemaField });
        //If current field is already mapped, update the csv field name value
        if (mapIndex !== -1) currentFieldMap[mapIndex].importField = e.target.value;
        else {
          //If not, add a mapping between the entity field name and the csv field name
          const schemaValue = _.find(schema, { fieldIdentifier: schemaField });
          if (schemaValue) {
            currentFieldMap.push({
              schemaField: schemaField,
              importField: e.target.value,
              fieldType: schemaValue.fieldType,
              fieldLabel: schemaValue.fieldLabel
            });
          }
        }
        this.fieldMap.set(currentFieldMap);
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