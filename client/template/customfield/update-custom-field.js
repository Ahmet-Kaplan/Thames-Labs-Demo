Template.updateCustomField.onRendered(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');
});

Template.updateCustomField.helpers({
  extInfos: function() {
    var arr = CustomFields.find({
      entityId: this.entity_data._id
    }).fetch();

    return arr.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  }
});

Template.updateCustomField.events({
  'click #submit-ext-info': function() {

    var arr = CustomFields.find({
      entityId: this.entity_data._id
    }).fetch();

    _.each(arr, function(field) {
      var name = field.name.replace(/ /g, '');
      var safeName = '#extInfos' + name;

      var newValue = '';
      switch (field.type) {
        case 'text':
          newValue = $(safeName + "TextValue").val();
          break;
        case 'advtext':
          newValue = $(safeName + "AdvTextValue").html();
          break;
        case 'checkbox':
          newValue = $(safeName + "BooleanValue").prop('checked');
          break;
        case 'date':
          newValue = $(safeName + "DateValue").val();
          break;
        case 'picklist':
          newValue = $(safeName + 'PicklistValue').val().trim();
          if (newValue === "") newValue = null;
          break;
      }

      if (field.global) {
        CustomFields.update({
          _id: field._id
        }, {
          $set: {
            value: newValue
          }
        });
      } else {
        var selectorName = safeName + "TypeOptions";
        var newType = $(selectorName).val();

        CustomFields.update({
          _id: field._id
        }, {
          $set: {
            value: newValue,
            type: newType
          }
        });
      }
    });

    Modal.hide();
  }
});