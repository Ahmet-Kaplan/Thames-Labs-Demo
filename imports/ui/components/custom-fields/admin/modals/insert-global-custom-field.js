import _ from 'lodash';
import MediumEditor from 'medium-editor';
import { ReactiveVar } from 'meteor/reactive-var';
import './insert-global-custom-field.html';
import '/imports/ui/components/custom-fields/customfield.css';

//Functions for getting/setting reactive vars
const getVar = (type) => Template.instance().reactiveVars[type].get(),
      setVar = (type) => {
        _.forEach(Template.instance().reactiveVars, function(value, key) {
          value.set(key === type);
        });
      };

Template.insertGlobalCustomField.onRendered(function() {
  $('#select-entity').selectize({
    create: false,
    allowEmptyOption: false
  });

  this.$('#custom-field-date-value').datetimepicker();

  this.$('#custom-field-picklist-values').selectize({
    delimiter: ',',
    create: function(input) {
      return {
        value: input,
        text: input
      };
    }
  });
});

Template.onCreated(function() {
  this.reactiveVars = {};
  this.reactiveVars.typeText = new ReactiveVar(true);
  this.reactiveVars.typeMultiText = new ReactiveVar(false);
  this.reactiveVars.typeCheckbox = new ReactiveVar(false);
  this.reactiveVars.typeDateTime = new ReactiveVar(false);
  this.reactiveVars.typeLabel = new ReactiveVar(false);
  this.reactiveVars.typePicklist = new ReactiveVar(false);
  this.reactiveVars.create = new ReactiveVar(false);

});

Template.insertGlobalCustomField.helpers({
  isLocal: function() {
    return Template.currentData();
  },
  typeText: function() {
    return getVar('typeText');
  },
  typeMultiText: function() {
    return getVar('typeMultiText');
  },
  typeCheckbox: function() {
    return getVar('typeCheckbox');
  },
  typeDateTime: function() {
    return getVar('typeDateTime');
  },
  typeLabel: function() {
    return getVar('typeLabel');
  },
  typePicklist: function() {
    return getVar('typePicklist');
  },
  create: function() {
    return getVar('create');
  },
  percentComplete: function() {
    return UserSession.get('globalFieldProgress');
  }
});

Template.insertGlobalCustomField.events({
  'click #typeText': function() {
    setVar('typeText');
  },
  'click #typeMultiText': function() {
    setVar('typeMultiText');

    editor = new MediumEditor('.editable', {
      placeholder: {
        text: 'Type or paste your content here...'
      },
      toolbar: false,
      autoLink: true
    });
  },
  'click #typeCheckbox': function() {
    setVar('typeCheckbox');
  },
  'click #typeDateTime': function() {
    setVar('typeDateTime');
  },
  'click #typeLabel': function() {
    setVar('typeLabel');
  },
  'click #typePicklist': function() {
    setVar('typePicklist');

    this.$('custom-field-picklist-values').selectize({
      delimiter: ',',
      create: function(input) {
        return {
          value: input,
          text: input
        };
      }
    });
  },
  'click #createCustomField': function(event, template) {
    event.preventDefault();

    //Validate form
    const cfName = $('#custom-field-name').val();
    let cfValue = "value",
        cfType = "text",
        cfEntity = "";

    if(Template.currentData()) {
      cfEntity = Template.currentData().entity_type;
    }else {
      cfEntity = $('#select-entity').val();
    }

    if (cfName === "") {
      toastr.warning('Please provide a name.');
      return;
    }
    if (cfEntity === "") {
      toastr.warning('Please select an entity.');
      return;
    }

    //Get data from form
    if (getVar('typeText')) {
      cfType = "text";
      cfValue = $('#custom-field-text-value').val();
    }
    if (getVar('typeMultiText')) {
      cfType = "advtext";
      cfValue = $('#custom-field-multitext-value').html();
    }
    if (getVar('typeCheckbox')) {
      cfType = "checkbox";
      cfValue = $('#custom-field-check-value').prop('checked');
    }
    if (getVar('typeDateTime')) {
      cfType = "date";
      cfValue = $('#custom-field-date-value').val();
    }
    if (getVar('typeLabel')) {
      cfType = "label";
      cfValue = '';
    }
    if (getVar('typePicklist')) {
      cfType = "picklist";
      cfValue = $('#custom-field-picklist-values').selectize().val();
    }

    //Get id of entity if local or tenant if global
    let entityId = '';

    if(Template.currentData()) {
      entityId = Template.currentData().entity_data._id;
    }else {
      entityId = Meteor.user().group;
    }

    //Check for duplicates
    if (CustomFields.findOne({
      name: cfName,
      target: cfEntity,
      entityId: entityId
    })) {
      toastr.error('A global custom field with that name already exists.');

    }else {

      //Change modal to progress bar
      UserSession.set("globalFieldProgress", 0);
      setVar('create');

      //Set maxValue so we know what the order field should be
      const recordFields = CustomFields.find({
        entityId: entityId
      }).fetch();
      let maxValue = -1;
      _.each(recordFields, function(x) {
        if (x.order > maxValue) maxValue = x.order;
      });

      //If local, add local field, if global, add global field
      if(Template.currentData()) {

        const entityType = Template.currentData().entity_type;
        Meteor.call('customFields.create', cfName, cfValue, cfType, maxValue, entityType, entityId, function(err, res) {
          if (err) {
            toastr.error(err);
          }
          if (res) {
            toastr.success('Custom field added.');
            UserSession.set("globalFieldProgress", 0);
            Modal.hide();
          }
        });

      }else{

        Meteor.call('customFields.addNewGlobal', cfName, cfType, cfValue, cfEntity, maxValue, Meteor.userId(), function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res === 0) {
            toastr.success('Global field created successfully.');
            Meteor.subscribe('globalCustomFields');
            Modal.hide();
          } else {
            UserSession.set("globalFieldProgress", 0);
            if (res === 1) {
              toastr.error('Only admins may add global fields.');
              Modal.hide();
            }
            if (res === 2) {
              toastr.error('No user detected');
              Modal.hide();
            }
          }
        });
      }
    }
  }
});
