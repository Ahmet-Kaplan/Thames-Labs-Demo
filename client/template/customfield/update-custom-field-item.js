Template.extInfo.helpers({
  extInfoId: function() {
    return this.name.replace(/ /g, '');
  }
});

Template.extInfo.events({
  'change .TypeSelectionMenu': function(event, template) {

    var index = this.name;
    var safeName = '#extInfos' + index.replace(/ /g, '');
    var selectorName = safeName + "TypeOptions";
    var newType = $(selectorName).val();

    switch (newType) {
      case 'text':
        $(safeName + "TextInputArea").show();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "AdvTextInputArea").hide();
        $(safeName + "DateInputArea").hide();
        $(safeName + "PicklistInputArea").hide();
        break;
      case 'advtext':
        $(safeName + "TextInputArea").hide();
        $(safeName + "AdvTextInputArea").show();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "DateInputArea").hide();
        $(safeName + "PicklistInputArea").hide();

        editor = new MediumEditor('.editable', {
          placeholder: {
            text: 'Type or paste your content here...'
          },
          toolbar: false,
          autoLink: true
        });
        break;
      case 'checkbox':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").show();
        $(safeName + "AdvTextInputArea").hide();
        $(safeName + "DateInputArea").hide();
        $(safeName + "PicklistInputArea").hide();
        break;
      case 'date':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "AdvTextInputArea").hide();
        $(safeName + "DateInputArea").show();
        $(safeName + "PicklistInputArea").hide();
        break;
      case 'picklist':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "AdvTextInputArea").hide();
        $(safeName + "DateInputArea").hide();
        $(safeName + "PicklistInputArea").show();
        break;
    }
  }
});

Template.extInfo.onCreated(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');
});

Template.extInfo.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  var index = this.data.name;
  var attr = this.data;

  var safeName = '#extInfos' + index.replace(/ /g, '');
  var selectorName = safeName + "TypeOptions";
  $(selectorName).val(attr.type);

  if (attr.listValues) {
    var options = _.map(attr.listValues.split(','), function(input) {
      return {
        value: input,
        text: input
      }
    });

    this.$(safeName + "PicklistValue").selectize({
      create: false,
      options: options,
      maxItems: 1
    });
  }

  switch (attr.type) {
    case 'text':
      $(safeName + "TextValue").val(attr.value);
      $(safeName + "TextInputArea").show();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").hide();
      $(safeName + "PicklistInputArea").hide();
      break;
    case 'advtext':
      $(safeName + "AdvTextValue").html(attr.value);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").show();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").hide();
      $(safeName + "PicklistInputArea").hide();

      editor = new MediumEditor('.editable', {
        placeholder: {
          text: 'Type or paste your content here...'
        },
        toolbar: false,
        autoLink: true
      });
      break;
    case 'checkbox':
      $(safeName + "BooleanValue").prop('checked', attr.value);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").show();
      $(safeName + "DateInputArea").hide();
      $(safeName + "PicklistInputArea").hide();
      break;
    case 'date':
      $(safeName + "DateValue").val(attr.value);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").show();
      $(safeName + "PicklistInputArea").hide();
      break;
    case 'picklist':
      $(safeName + "TextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "DateInputArea").hide();
      $(safeName + "PicklistInputArea").show();

      var se = $(safeName + 'PicklistValue').selectize();
      se[0].selectize.setValue(attr.value);
      break;
  }

});