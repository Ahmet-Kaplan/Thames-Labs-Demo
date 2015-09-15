Template.customFieldDisplay.events({
  'click #add-custom-field': function(event) {
    event.preventDefault();
    Modal.show('addCustomField', this);
  },
  'click #edit-custom-fields': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  },
});

Template.customFieldDisplay.helpers({
  customFields: function() {
    var ret = [];

    for (var cf in this.entity_data.customFields) {

      switch (this.entity_data.customFields[cf].dataType) {
        case 'text':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: this.entity_data.customFields[cf].dataValue,
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
        case 'checkbox':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: (this.entity_data.customFields[cf].dataValue ? this.entity_data.customFields[cf].dataValue : "false"),
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
        case 'date':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: new moment(this.entity_data.customFields[cf].dataValue).format('MMMM Do YYYY'),
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
      }
    }

    return ret.sort(function(a, b) {
      if (a.isGlobal === false && b.isGlobal === true) return -1;
      if (a.isGlobal === true && b.isGlobal === false) return 1;
      return 0;
    });
  }
});


Template.cfDisplay.helpers({
  parentHelper: function(parentContext) {
    this.parentEntity = parentContext;
  },
  trimmedName: function() {
    return this.name.replace(/\s/g, '');
  }
});

Template.cfDisplay.events({
  'click #delete-custom-field': function(event) {
    event.preventDefault();
    var self = this;
    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {

        switch (self.parentEntity.entity_type) {
          case "company":
            var parentCompany = Companies.findOne(self.parentEntity.entity_data._id);
            var cfMaster = {};
            for (var cf in parentCompany.customFields) {
              if (cf !== self.name) {
                cfMaster[cf] = parentCompany.customFields[cf];
              }
            }
            Companies.update(parentCompany._id, {
              $set: {
                customFields: cfMaster
              }
            });
            break;
          case "contact":
            var parentContact = Contacts.findOne(self.parentEntity.entity_data._id);
            var cfMaster = {};
            for (var cf in parentContact.customFields) {
              if (cf !== self.name) {
                cfMaster[cf] = parentContact.customFields[cf];
              }
            }
            Contacts.update(parentContact._id, {
              $set: {
                customFields: cfMaster
              }
            });
            break;
        }
        toastr.success('Custom field removed.');
      } else {
        return;
      }
    });
  }
});


Template.addCustomField.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  $('#typeText').prop('checked', true);
  $('#typeCheckbox').prop('checked', false);
  $('#typeDate').prop('checked', false);

  $('#text-input-area').show();
  $('#check-input-area').hide();
  $('#date-input-area').hide();
});

Template.addCustomField.events({
  'click #typeText': function() {
    $('#text-input-area').show();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
  },
  'click #typeCheckbox': function() {
    $('#text-input-area').hide();
    $('#check-input-area').show();
    $('#date-input-area').hide();
  },
  'click #typeDate': function() {
    $('#text-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').show();
  },
  'click #submit-custom-field': function() {
    var cfName = $('#custom-field-name').val();
    var cfValue = "value";
    var cfType = "text";

    if ($('#typeText').prop('checked')) {
      cfType = "text";
      cfValue = $('#custom-field-text-value').val();
    }
    if ($('#typeCheckbox').prop('checked')) {
      cfType = "checkbox";
      cfValue = $('#custom-field-check-value').prop('checked');
    }
    if ($('#typeDate').prop('checked')) {
      cfType = "date";
      cfValue = $('#custom-field-date-value').val();
    }

    var cfMaster = {};
    var nameExists = false;

    for (var cf in this.entity_data.customFields) {
      if (cf === cfName) {
        nameExists = true;
        break;
      }
      cfMaster[cf] = this.entity_data.customFields[cf];
    }

    if (!nameExists) {
      var settings = {
        "dataValue": cfValue,
        "dataType": cfType,
        isGlobal: false
      }
      cfMaster[cfName] = settings;

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
        default:
          toastr.error('Custom field not added: custom field entity type not recognised.');
          Modal.hide();
          return;
      }
      toastr.success('Custom field added.');
    } else {
      toastr.error('A custom field with that name has already been added.');
    }

    Modal.hide();
  }
});

Template.updateCustomField.events({
  'click #submit-ext-info': function() {

    //Master object to contain all custom fields
    var cfMaster = {};

    var cfObject = this.entity_data.customFields;
    for (var index in cfObject) {
      if (cfObject.hasOwnProperty(index)) {

        //get prettified name
        var name = index.replace(' ', '');
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
      default:
        toastr.error('Custom field not added: custom field entity type not recognised.');
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

Template.extInfo.helpers({
  extInfoId: function() {
    return this.name.replace(' ', '');
  }
});

Template.extInfo.events({
  'change #extInfosTypeOptions': function() {
    var index = this.name;
    var safeName = '#extInfos' + index.replace(' ', '');
    var selectorName = "#extInfosTypeOptions";
    var newType = $(selectorName).val();

    switch (newType) {
      case 'text':
        $(safeName + "TextInputArea").show();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "DateInputArea").hide();
        break;
      case 'checkbox':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").show();
        $(safeName + "DateInputArea").hide();
        break;
      case 'date':
        $(safeName + "TextInputArea").hide();
        $(safeName + "BooleanInputArea").hide();
        $(safeName + "DateInputArea").show();
        break;
    }
  }
});

Template.extInfo.onRendered(function() {

  this.$('.datetimepicker').datetimepicker();
  var index = this.data.name;
  var attr = this.data.props;

  var safeName = '#extInfos' + index.replace(' ', '');
  var selectorName = "#extInfosTypeOptions";
  $(selectorName).val('text');

  switch (attr.dataType) {
    case 'text':
      // if (attr.isGlobal) {
      $(selectorName).val('text');
      // };
      $(safeName + "TextValue").val(attr.dataValue);
      $(safeName + "TextInputArea").show();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").hide();
      break;
    case 'checkbox':
      // if (attr.isGlobal) {
      $(selectorName).val('checkbox');
      // };
      $(safeName + "BooleanValue").prop('checked', attr.dataValue);
      $(safeName + "TextInputArea").hide();
      $(safeName + "BooleanInputArea").show();
      $(safeName + "DateInputArea").hide();
      break;
    case 'date':
      // if (attr.isGlobal) {
      $(selectorName).val('date');
      // };
      $(safeName + "DateValue").val(attr.dataValue);
      $(safeName + "TextInputArea").hide();
      $(safeName + "BooleanInputArea").hide();
      $(safeName + "DateInputArea").show();
      break;
  }

});
