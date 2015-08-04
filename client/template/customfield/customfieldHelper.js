Template.customFieldDisplay.events({
  'click #add-custom-field': function() {
    Modal.show('addCustomField', this);
  }
});

Template.customFieldDisplay.helpers({
  customFields: function() {
    var ret = [];

    for (var cf in this.entity_data.customFields) {
      var cfObj = {
        name: cf,
        value: this.entity_data.customFields[cf]
      };
      ret.push(cfObj);
    }

    return ret;
  }
});

Template.addCustomField.onRendered(function() {
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
    var cfValue = $('#custom-field-value').val();
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
      cfMaster[cfName] = cfValue;

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


Template.cfDisplay.helpers({
  parentHelper: function(parentContext) {
    this.parentEntity = parentContext;
  }
});

Template.cfDisplay.events({
  'click #edit-custom-field': function() {
    Modal.show('updateCustomField', this);
  },
  'click #delete-custom-field': function() {

    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === false) {
        return;
      }
    });

    switch (this.parentEntity.entity_type) {
      case "company":
        var parentCompany = Companies.findOne(this.parentEntity.entity_data._id);

        var cfMaster = {};

        for (var cf in parentCompany.customFields) {
          if (cf !== this.name) {
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
        var parentContact = Contacts.findOne(this.parentEntity.entity_data._id);

        var cfMaster = {};

        for (var cf in parentContact.customFields) {
          if (cf !== this.name) {
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
  }
});

Template.updateCustomField.events({
  'click #submit-custom-field': function() {
    var cfName = $('#custom-field-name').val();
    var cfValue = $('#custom-field-value').val();

    var cfMaster = {};

    switch (this.parentEntity.entity_type) {
      case 'company':
        var parentCompany = Companies.findOne(this.parentEntity.entity_data._id);

        for (var cf in parentCompany.customFields) {
          if (cf === cfName) {
            cfMaster[cf] = cfValue;
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
            cfMaster[cf] = cfValue;
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
