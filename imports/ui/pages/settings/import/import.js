import './import.html';
import '/imports/ui/components/progress-bar/progress-bar.js';
import '/imports/ui/components/settings/import/map-fields/map-fields.js';

Template.importSettings.onCreated(function() {
  this.entityType = new ReactiveVar("companies");
  this.currentStage = new ReactiveVar(1);
  this.csvFileName = new ReactiveVar("");
  this.unprocessedData = new ReactiveVar();
  this.fieldMap = new ReactiveVar([]);
  this.globalCustomFields = new ReactiveVar([]);
  this.localCustomFields = new ReactiveVar([]);
});

const initEntityPicker = (instance) => {
  $('.selectpicker').selectpicker();
  $('.selectpicker').on('changed.bs.select', (event, clickedIndex, newValue, oldValue) => {
    instance.entityType.set(event.currentTarget[clickedIndex].value);
    instance.currentStage.set(1);
    instance.unprocessedData.set();
    instance.csvFileName.set();
  });
};

Template.importSettings.onRendered(function() {
  initEntityPicker(this);
});

Template.importSettings.helpers({
  currentStage: function() {
    return Template.instance().currentStage.get();
  },
  fileName: function() {
    return Template.instance().csvFileName.get();
  },
  unprocessedData: function() {
    return Template.instance().unprocessedData.get();
  },
  unprocessedDataFields: function() {
    const unprocessedData = Template.instance().unprocessedData.get();
    if (unprocessedData) {
      return unprocessedData.meta.fields;
    }
  },
  entityType: function() {
    return Template.instance().entityType.get();
  },
  importErrors: function() {
    return UserSession.get("importErrors");
  },
  fieldMap: function() {
    //Don't return the value, just the reference to the ReactiveVar
    //So child template can change it's value
    return Template.instance().fieldMap;
  },
  globalCustomFields: function() {
    //Don't return the value, just the reference to the ReactiveVar
    //So child template can change it's value
    return Template.instance().globalCustomFields;
  },
  localCustomFields: function() {
    //Don't return the value, just the reference to the ReactiveVar
    //So child template can change it's value
    return Template.instance().localCustomFields;
  }
});

Template.importSettings.events({
  'click .upload-csv': function() {
    document.getElementById('data-upload').click();
    Template.instance().currentStage.set(1);
    Template.instance().unprocessedData.set();
    Template.instance().csvFileName.set();
  },
  'change #data-upload': function(event, template) {
    const file = event.target.files[0];

    //Confirm file is in the correct format
    if (!file) return;

    const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const fileName = file.name;
    const match = (fileName).match(patt1);

    //Show error messages if necessary
    if (match) {
      if (match[1].toLowerCase() !== "csv") {
        toastr.error('Only CSV files can be used to import data');
        return;
      }
    } else {
      toastr.error('Unable to read data, please ensure you have uploaded a valid CSV file.');
      return;
    }

    //Setup data processor
    const templateInstance = Template.instance();
    const reader = new FileReader();
    reader.onerror = (error) => {
      toastr.error(error, 'Unable to read data, please ensure you have uploaded a valid CSV file.');
    };
    reader.onload = () => {
      const data = reader.result;
      const options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      const unprocessedData = Papa.parse(data, options);
      templateInstance.unprocessedData.set(unprocessedData);

      //Update UI
      templateInstance.currentStage.set(2);
      templateInstance.csvFileName.set(fileName);
    };

    //Read in data, using functions above, clear the data upload field once complete
    reader.readAsText(file);
    $('#data-upload').val('');
  },
  'click .import-data': function(event, template) {
    const instance = Template.instance();
    instance.currentStage.set(3);
    //Hide step 1 entity picker as Blaze doesn't do it for us
    $('.bootstrap-select').remove();

    //Clear error list
    UserSession.set("importErrors", []);

    //Setup required vars
    const fieldMap = instance.fieldMap.get();
    const localCustomFields = instance.localCustomFields.get();
    const globalCustomFields = instance.globalCustomFields.get();
    const importData = instance.unprocessedData.get().data;
    const entityType = instance.entityType.get();

    Meteor.call('import.do', importData, entityType, fieldMap, Meteor.userId(), globalCustomFields, localCustomFields, (error, result) => {
      instance.currentStage.set(4);
    });
  },
  'click #import-more': function() {
    Template.instance().currentStage.set(1);
    Template.instance().unprocessedData.set();
    Template.instance().csvFileName.set('');
    Template.instance().entityType.set('companies');
    Template.instance().fieldMap.set([]);
    Template.instance().globalCustomFields.set([]);
    Template.instance().localCustomFields.set([]);
    UserSession.set("importErrors", null);
    UserSession.set("progressValue", []);
    //Use timeout to let blaze update itself
    const instance = Template.instance();
    Meteor.setTimeout(() => {
      initEntityPicker(instance);
    }, 200);
  }
});