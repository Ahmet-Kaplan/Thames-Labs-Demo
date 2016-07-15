import _ from 'lodash';
import './insert-global-custom-field.html';
import { ReactiveVar } from 'meteor/reactive-var';
import MediumEditor from 'medium-editor';
import '/imports/ui/components/custom-fields/customfield.css';


const getVar = (type) => Template.instance().reactiveVars[type].get(),

      setVar = (type) => {
        _.forEach(Template.instance().reactiveVars, function(value, key) {
          Template.instance().reactiveVars[key].set(false);
        });
        Template.instance().reactiveVars[type].set(true);
      };


Template.insertGlobalCustomField.onRendered(function() {
  $('#select-entity').selectize({
    create: false,
    allowEmptyOption: false
  });

  this.$('.datetimepicker').datetimepicker();

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
  },
  'click #createCustomField': function(event, template) {
    event.preventDefault();

    var cfName = $('#custom-field-name').val();
    var cfValue = "value";
    var cfType = "text";
    var cfEntity = $('#select-entity').val();
    var freePlanMaxFlag = false;

    if (cfName === "") {
      toastr.warning('Please provide a name.');
      return;
    }
    if (cfEntity === "") {
      toastr.warning('Please select an entity.');
      return;
    }

    // const fields = Meteor.call('extInfo.getTenantGlobals', cfEntity);
    const fields = CustomFields.find({target: cfEntity}).fetch();
    console.log(fields.length);

    if (fields.length === MAX_FREE_ENTITY_GLOBAL_FIELDS) {
      freePlanMaxFlag = true;
    }

    if (!isProTenant(Meteor.user().group) && freePlanMaxFlag === true) {
      showUpgradeToastr('To create more than 5 global custom fields for a ' + cfEntity + ' record');
      Modal.hide();
      return;
    }
    console.log(freePlanMaxFlag);

    if (freePlanMaxFlag === false) {
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

      // console.log("Name: " + cfName + " Type: " + cfType + " Value: " + cfValue + " Entity: " + cfEntity);
      if (CustomFields.findOne({
        name: cfName,
        target: cfEntity
      })) {
        var duplicateFlag = true;
      }

      if (!duplicateFlag) {
        UserSession.set("globalFieldProgress", 0);
        setVar('create');

        Meteor.call('extInfo.addNewGlobal', cfName, cfType, cfValue, cfEntity, Meteor.userId(), function(err, res) {

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
      }else {
        toastr.error('A global custom field with that name already exists.');
      }
    }

  }
});
