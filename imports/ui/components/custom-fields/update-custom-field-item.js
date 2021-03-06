import MediumEditor from 'medium-editor';
import { ReactiveVar } from 'meteor/reactive-var';
import './update-custom-field-item.html';
import './customfield.css';

Template.customFieldItem.onCreated(function() {
  this.type = new ReactiveVar(this.data.type);
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

Template.customFieldItem.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  const field = this.data,
        index = field.name,
        safeName = '#customField' + index.replace(/ /g, '');

  let options = [];
  if (field.listValues) {
    options = _.map(field.listValues.split(','), function(input) {
      return {
        value: input,
        text: input
      };
    });
  }

  if (field.type == 'picklist') {
    $(".cf-selectize").selectize({
      create: false,
      options: options,
      maxItems: 1
    });
    se[0].selectize.setValue(field.value);
  }

  $(`${safeName}AdvTextValue`).html(field.value);
  editor = new MediumEditor('.editable', {
    placeholder: false,
    toolbar: false,
    autoLink: true
  });

  if(field.type == 'checkbox') {
    if(field.value == 'true') {
      $(`${safeName}BooleanValue`).attr('checked', 'checked');
    }
  }

});
