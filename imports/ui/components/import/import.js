import './import.html';
import '/imports/ui/components/progress-bar/progress-bar.js';
import './map-fields/map-fields.js';
import {mapUnusedCsvFieldsToCustomFields} from './map-fields/helpers.js';

Template.importPage.onCreated(function() {
  this.entityType = new ReactiveVar("companies");
  this.currentStage = new ReactiveVar(1);
  this.csvFileName = new ReactiveVar("");
  this.unprocessedData = new ReactiveVar();
  this.fieldMap = new ReactiveVar([]);
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

Template.importPage.onRendered(function() {
  initEntityPicker(this);
});

Template.importPage.helpers({
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
  hasCustomFields: function() {
    const t = Template.instance().entityType.get();
    if (t == "companies" || t == "contacts" || t == "products" || t == "projects") return true;
  },
  companies: function() {
    if (FlowRouter.getQueryParam("entity") == "companies") return true;
  },
  contacts: function() {
    if (FlowRouter.getQueryParam("entity") == "contacts") return true;
  },
  opportunities: function() {
    if (FlowRouter.getQueryParam("entity") == "opportunities") return true;
  },
  projects: function() {
    if (FlowRouter.getQueryParam("entity") == "projects") return true;
  },
  products: function() {
    if (FlowRouter.getQueryParam("entity") == "products") return true;
  },
  purchaseOrders: function() {
    if (FlowRouter.getQueryParam("entity") == "purchaseOrders") return true;
  },
  tasks: function() {
    if (FlowRouter.getQueryParam("entity") == "tasks") return true;
  },
  activities: function() {
    if (FlowRouter.getQueryParam("entity") == "activities") return true;
  }
});

Template.importPage.events({
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
    if ($('#add-local-custom-fields').is(':checked')) mapUnusedCsvFieldsToCustomFields(instance.unprocessedData.get().meta.fields, fieldMap);
    const importData = instance.unprocessedData.get().data;
    const entityType = instance.entityType.get();

    Meteor.call('import.do', importData, entityType, fieldMap, Meteor.userId(), (error, result) => {
      instance.currentStage.set(4);
    });
  },
  'click #import-more': function() {
    Template.instance().currentStage.set(1);
    Template.instance().unprocessedData.set();
    Template.instance().csvFileName.set('');
    Template.instance().entityType.set('companies');
    Template.instance().fieldMap.set([]);
    UserSession.set("importErrors", null);
    UserSession.set("progressValue", []);
    //Use timeout to let blaze update itself
    const instance = Template.instance();
    Meteor.setTimeout(() => {
      initEntityPicker(instance);
    }, 200);
  }
});
