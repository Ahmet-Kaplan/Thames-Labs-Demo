Template.customFieldDisplay.events({
  'click #add-custom-field': function() {
    Modal.show('addCustomField', this);
  }
});

Template.customFieldDisplay.helpers({
  customFields: function() {
    var ret = [];

    for (var cf in this.customFields) {
      var cfObj = {
        name: cf,
        value: this.customFields[cf]
      };
      ret.push(cfObj);
    }

    return ret;
  }
});

Template.addCustomField.events({
  'click #submit-custom-field': function() {
    var cfName = $('#custom-field-name').val();
    var cfValue = $('#custom-field-value').val();
    var cfMaster = {};
    var nameExists = false;

    for (var cf in this.customFields) {
      if (cf === cfName) {
        nameExists = true;
        break;
      }
      cfMaster[cf] = this.customFields[cf]
    }

    if (!nameExists) {
      cfMaster[cfName] = cfValue;

      Companies.update(this._id, {
        $set: {
          customFields: cfMaster
        }
      });
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

    var parentCompany = Companies.findOne(this.parentEntity._id);

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
    toastr.success('Custom field removed.');
  }
});

Template.updateCustomField.events({
  'click #submit-custom-field': function() {
    var cfName = $('#custom-field-name').val();
    var cfValue = $('#custom-field-value').val();

    var parentCompany = Companies.findOne(this.parentEntity._id);

    var cfMaster = {};

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
    toastr.success('Custom field updated.');

    Modal.hide();
  }
});
