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
        break;
      case 'advtext':
        $(safeName + "TextInputArea").hide();
        $(safeName + "AdvTextInputArea").show();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "DateInputArea").hide();

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
        break;
      case 'date':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "AdvTextInputArea").hide();
        $(safeName + "DateInputArea").show();
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
  var attr = this.data.props;

  var safeName = '#extInfos' + index.replace(/ /g, '');
  var selectorName = safeName + "TypeOptions";
  $(selectorName).val(attr.dataType);

  console.log(selectorName, attr.dataType);

  switch (attr.dataType) {
    case 'text':
      $(safeName + "TextValue").val(attr.dataValue);
      $(safeName + "TextInputArea").show();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").hide();
      break;
    case 'advtext':
      $(safeName + "AdvTextValue").html(attr.dataValue);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").show();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").hide();

      editor = new MediumEditor('.editable', {
        placeholder: {
          text: 'Type or paste your content here...'
        },
        toolbar: false,
        autoLink: true
      });
      break;
    case 'checkbox':
      $(safeName + "BooleanValue").prop('checked', attr.dataValue);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").show();
      $(safeName + "DateInputArea").hide();
      break;
    case 'date':
      $(safeName + "DateValue").val(attr.dataValue);
      $(safeName + "TextInputArea").hide();
      $(safeName + "AdvTextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").show();
      break;
  }

});