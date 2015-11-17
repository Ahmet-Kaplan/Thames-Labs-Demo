Template.updateCustomField.events({
  'click #submit-ext-info': function() {

    //Master object to contain all extended information fields
    var cfMaster = {};

    var cfObject = this.entity_data.customFields;
    for (var index in cfObject) {
      if (cfObject.hasOwnProperty(index)) {

        //get prettified name
        var name = index.replace(/ /g, '');
        var safeName = '#extInfos' + name;

        //get current (old) settings
        var attr = cfObject[index];

        var newValue = undefined;

        if (attr.isGlobal) {
          switch (attr.dataType) {
            case 'text':
              newValue = $(safeName + "TextValue").val();
              break;
            case 'checkbox':
              newValue = $(safeName + "BooleanValue").prop('checked');
              break;
            case 'date':
              newValue = $(safeName + "DateValue").val();
              break;
          }

          var settings = {
            "dataValue": newValue,
            "dataType": attr.dataType,
            isGlobal: true
          }
          cfMaster[index] = settings;

        } else {
          var selectorName = "#extInfosTypeOptions";
          var newType = $(selectorName).val();

          switch (newType) {
            case 'text':
              newValue = $(safeName + "TextValue").val();
              break;
            case 'checkbox':
              newValue = $(safeName + "BooleanValue").prop('checked');
              break;
            case 'date':
              newValue = $(safeName + "DateValue").val();
              break;
          }

          var settings = {
            "dataValue": newValue,
            "dataType": newType,
            isGlobal: false
          }
          cfMaster[index] = settings;

        }
      }
    }

    switch (this.entity_type) {
      case 'company':
        Companies.update(this.entity_data._id, {
          $set: {
            customFields: cfMaster
          }
        });
        break;
      case 'contact':
        Contacts.update(this.entity_data._id, {
          $set: {
            customFields: cfMaster
          }
        });
        break;
      case 'project':
        Projects.update(this.entity_data._id, {
          $set: {
            customFields: cfMaster
          }
        });
        break;
      default:
        toastr.error('Extended information field not added: entity type not recognised.');
        Modal.hide();
        return;
    }

    Modal.hide();
  }
});

Template.updateCustomField.helpers({
  extInfos: function() {
    var data = [];

    cfObject = this.entity_data.customFields;
    for (var index in cfObject) {
      if (cfObject.hasOwnProperty(index)) {
        var attr = cfObject[index];
        var ei = {
          name: index,
          props: attr
        };
        data.push(ei);
      }
    }

    return data.sort(function(a, b) {
      if (!a.props.isGlobal && b.props.isGlobal) return 1;
      if (a.props.isGlobal && !b.props.isGlobal) return -1;
      return 0;
    });
  }
});
