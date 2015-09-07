Template.customFieldDisplay.events({
  'click #add-custom-field': function(event) {
    event.preventDefault();
    Modal.show('addCustomField', this);
  }
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
      if (a.isGlobal && !b.isGlobal) {
        return -1;
      }
      if (!a.isGlobal && b.isGlobal) {
        return 1;
      }
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
  'click #edit-custom-field': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  },
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

Template.updateCustomField.onRendered(function() {

  this.$('.datetimepicker').datetimepicker();

  switch (this.data.type) {
    case 'text':
      $('#typeText').prop('checked', true);
      $('#typeCheckbox').prop('checked', false);
      $('#typeDate').prop('checked', false);

      $('#text-input-area').show();
      $('#check-input-area').hide();
      $('#date-input-area').hide();

      $('#custom-field-text-value').val(this.data.value);
      break;
    case 'checkbox':
      $('#typeText').prop('checked', false);
      $('#typeCheckbox').prop('checked', true);
      $('#typeDate').prop('checked', false);

      $('#text-input-area').hide();
      $('#check-input-area').show();
      $('#date-input-area').hide();

      $('#custom-field-check-value').prop('checked', this.data.value);
      break;
    case 'date':
      $('#typeText').prop('checked', false);
      $('#typeCheckbox').prop('checked', false);
      $('#typeDate').prop('checked', true);

      $('#text-input-area').hide();
      $('#check-input-area').hide();
      $('#date-input-area').show();

      $('#custom-field-date-value').val(this.data.value);
      break;
  }

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
        "isGlobal": false
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
    console.log(this);

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

    var settings = {
      "dataValue": cfValue,
      "dataType": cfType,
      "isGlobal": this.isGlobal
    }

    var cfMaster = {};

    switch (this.parentEntity.entity_type) {
      case 'company':
        var parentCompany = Companies.findOne(this.parentEntity.entity_data._id);

        for (var cf in parentCompany.customFields) {
          if (cf === cfName) {
            cfMaster[cf] = settings;
          } else {
            cfMaster[cf] = parentCompany.customFields[cf];
          }
        }

        Companies.update(parentCompany._id, {
          $set: {
            customFields: cfMaster
          }
        });
        break;
      case 'contact':
        var parentContact = Contacts.findOne(this.parentEntity.entity_data._id);

        for (var cf in parentContact.customFields) {
          if (cf === cfName) {
            cfMaster[cf] = settings;
          } else {
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
    toastr.success('Custom field updated.');

    Modal.hide();
  }
});
