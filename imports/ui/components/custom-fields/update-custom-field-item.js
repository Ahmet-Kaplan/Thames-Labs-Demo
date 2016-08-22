import MediumEditor from 'medium-editor';
import { ReactiveVar } from 'meteor/reactive-var';
import './update-custom-field-item.html';
import './customfield.css';

Template.customFieldItem.onCreated(function() {
  this.type = new ReactiveVar("");
});

Template.customFieldItem.helpers({
  fieldName: function() {
    return this.name.replace(/ /g, '');
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
  }
});

Template.customFieldItem.events({
  'change .TypeSelectionMenu': function(event, template) {

    const index = this.name,
          safeName = '#customField' + index.replace(/ /g, ''),
          selectorName = safeName + "TypeOptions",
          newType = $(selectorName).val();
    Template.instance().type.set(newType);
  }
});

Template.customFieldItem.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  const field = this.data,
        index = field.name,
        safeName = '#customField' + index.replace(/ /g, '');

  if(field.listValues) {
    var options = _.map(field.listValues.split(','), function(input) {
      return {
        value: input,
        text: input
      };
    });

    this.$(safeName + "PicklistValue").selectize({
      create: false,
      options: options,
      maxItems: 1
    });
  }

  $(`${safeName}AdvTextValue`).html(field.value);
  editor = new MediumEditor('.editable', {
    placeholder: {
      text: 'Type or paste your content here...'
    },
    toolbar: false,
    autoLink: true
  });

  if(field.type == 'checkbox') {
    if(field.value == 'true') {
      $(`${safeName}BooleanValue`).attr('checked', 'checked');
    }
  }else if(field.type == 'picklist') {
    const se = $(safeName + 'PicklistValue').selectize();
    se[0].selectize.setValue(field.value);
  }

  Template.instance().type.set(this.data.type);
});
