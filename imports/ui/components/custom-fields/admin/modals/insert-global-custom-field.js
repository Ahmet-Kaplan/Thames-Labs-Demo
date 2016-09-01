import _ from 'lodash';
import MediumEditor from 'medium-editor';
import { ReactiveVar } from 'meteor/reactive-var';
import './insert-global-custom-field.html';
import '/imports/ui/components/custom-fields/customfield.css';

Template.insertGlobalCustomField.onCreated(function() {
  this.type = new ReactiveVar("text");
  this.create = new ReactiveVar(false);
});

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

Template.insertGlobalCustomField.helpers({
  isLocal: function() {
    return Template.currentData();
  },
  typeText: function() {
    return Template.instance().type.get() == 'text';
  },
  typeMultiText: function() {
    return Template.instance().type.get() == 'advtext';
  },
  typeCheckbox: function() {
    return Template.instance().type.get() == 'checkbox';
  },
  typeDateTime: function() {
    return Template.instance().type.get() == 'date';
  },
  typeLabel: function() {
    return Template.instance().type.get() == 'label';
  },
  typePicklist: function() {
    return Template.instance().type.get() == 'picklist';
  },
  create: function() {
    return Template.instance().create.get();
  },
  percentComplete: function() {
    return UserSession.get('globalFieldProgress');
  }
});

Template.insertGlobalCustomField.events({
  'click #typeText': function() {
    Template.instance().type.set('text');
  },
  'click #typeMultiText': function() {
    Template.instance().type.set('advtext');

    editor = new MediumEditor('.editable', {
      placeholder: {
        text: 'Type or paste your content here...'
      },
      toolbar: false,
      autoLink: true
    });
  },
  'click #typeCheckbox': function() {
    Template.instance().type.set('checkbox');
  },
  'click #typeDateTime': function() {
    Template.instance().type.set('date');
  },
  'click #typeLabel': function() {
    Template.instance().type.set('label');
  },
  'click #typePicklist': function() {
    Template.instance().type.set('picklist');
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

    //Get values from form
    switch (Template.instance().type.get()) {
      case 'text':
        cfType = "text";
        cfValue = $('#custom-field-text-value').val();
        break;
      case 'advtext':
        cfType = "advtext";
        cfValue = $('#custom-field-multitext-value').html();
        break;
      case 'checkbox':
        cfType = "checkbox";
        cfValue = $('#custom-field-check-value').prop('checked');
        break;
      case 'date':
        cfType = "date";
        cfValue = $('#custom-field-date-value').val();
        break;
      case 'label':
        cfType = "label";
        cfValue = '';
        break;
      case 'picklist':
        cfType = "picklist";
        cfValue = $('#custom-field-picklist-values').selectize().val();
        break;
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
      Template.instance().create.set(true);

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

      }else {

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
