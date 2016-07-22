import MediumEditor from 'medium-editor';
import { ReactiveVar } from 'meteor/reactive-var';
import './update-custom-field-item.html';
import './customfield.css';

const getVar = (type) => Template.instance().reactiveVars[type].get(),
      setVar = (type) => {
        _.forEach(Template.instance().reactiveVars, function(value, key) {
          Template.instance().reactiveVars[key].set(false);
        });
        Template.instance().reactiveVars[type].set(true);
      };

Template.extInfo.onCreated(function() {
  this.reactiveVars = {};
  this.reactiveVars.text = new ReactiveVar(false);
  this.reactiveVars.advtext = new ReactiveVar(false);
  this.reactiveVars.checkbox = new ReactiveVar(false);
  this.reactiveVars.date = new ReactiveVar(false);
  this.reactiveVars.label = new ReactiveVar(false);
  this.reactiveVars.picklist = new ReactiveVar(false);

  setVar(this.data.type);
});

Template.extInfo.helpers({
  extInfoId: function() {
    return this.name.replace(/ /g, '');
  },
  typeText: function() {
    return getVar('text');
  },
  typeMultiText: function() {
    return getVar('advtext');
  },
  typeCheckbox: function() {
    return getVar('checkbox');
  },
  typeDateTime: function() {
    return getVar('date');
  },
  typeLabel: function() {
    return getVar('label');
  },
  typePicklist: function() {
    return getVar('picklist');
  }
});

Template.extInfo.events({
  'change .TypeSelectionMenu': function(event, template) {

    const field = this,
          index = this.name,
          safeName = '#extInfos' + index.replace(/ /g, ''),
          selectorName = safeName + "TypeOptions",
          newType = $(selectorName).val();

    setVar(newType);
  }
});

Template.extInfo.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  const field = this.data,
        index = field.name,
        safeName = '#extInfos' + index.replace(/ /g, '');

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

  if(field.type == 'advtext') {
    $(`${safeName}AdvTextValue`).html(field.value);
    editor = new MediumEditor('.editable', {
      placeholder: {
        text: 'Type or paste your content here...'
      },
      toolbar: false,
      autoLink: true
    });
  }else if(field.type == 'checkbox') {
    $(`${safeName}BooleanValue`).prop('checked', field.value);
  }else if(field.type == 'picklist') {
    const se = $(safeName + 'PicklistValue').selectize();
    se[0].selectize.setValue(field.value);
  }
});
