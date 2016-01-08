Template.addNewGlobalCustomField.onRendered(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');

  $('#select-entity').selectize({
    create: false,
    allowEmptyOption: false
  });

  this.$('.datetimepicker').datetimepicker();

  $('#typeText').prop('checked', true);
  $('#typeAdvText').prop('checked', false);
  $('#typeCheckbox').prop('checked', false);
  $('#typeDate').prop('checked', false);
  $('#typeLabel').prop('checked', false);

  $('#text-input-area').show();
  $('#advtext-input-area').hide();
  $('#check-input-area').hide();
  $('#date-input-area').hide();
});

Template.addNewGlobalCustomField.events({
  'click #typeText': function() {
    $('#text-input-area').show();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
  },
  'click #typeAdvText': function() {

    editor = new MediumEditor('.editable', {
      placeholder: {
        text: 'Type or paste your content here...'
      },
      toolbar: false,
      autoLink: true
    });

    $('#text-input-area').hide();
    $('#advtext-input-area').show();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
  },
  'click #typeCheckbox': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').show();
    $('#date-input-area').hide();
  },
  'click #typeDate': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').show();
  },
  'click #typeLabel': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
  },
  'click #createCustomField': function() {
    $('#createCustomField').prop('disabled', true);
    var cfName = $('#custom-field-name').val();
    var cfValue = "value";
    var cfType = "text";
    var cfEntity = $('#select-entity').val();

    if (cfName === "") {
      toastr.warning('Please provide a name.');
      return;
    }
    if (cfEntity === "") {
      toastr.warning('Please select an entity.');
      return;
    }

    if ($('#typeText').prop('checked')) {
      cfType = "text";
      cfValue = $('#custom-field-text-value').val();
    }
    if ($('#typeAdvText').prop('checked')) {
      cfType = "advtext";
      cfValue = $('#custom-field-advtext-value').html();
    }
    if ($('#typeCheckbox').prop('checked')) {
      cfType = "checkbox";
      cfValue = $('#custom-field-check-value').prop('checked');
    }
    if ($('#typeDate').prop('checked')) {
      cfType = "date";
      cfValue = $('#custom-field-date-value').val();
    }
    if ($('#typeLabel').prop('checked')) {
      cfType = "label";
      cfValue = '';
    }

    var user = Meteor.users.findOne(Meteor.userId());
    var tenant = Tenants.findOne(user.group);
    var fields = null;

    switch (cfEntity) {
      case 'company':
        fields = tenant.settings.extInfo.company;
        break;
      case 'contact':
        fields = tenant.settings.extInfo.contact;
        break;
      case 'project':
        fields = tenant.settings.extInfo.project;
        break;
      case 'product':
        fields = tenant.settings.extInfo.product;
        break;
    }

    var data = [];
    _.each(fields, function(f) {
      data.push(f);
    });

    var orderValue = data.length;

    var newField = {
      name: cfName,
      type: cfType,
      defaultValue: cfValue,
      targetEntity: cfEntity,
      dataOrder: orderValue
    };

    if (_.findWhere(fields, newField) === undefined) {
      data.push(newField);
    }

    switch (cfEntity) {
      case 'company':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.company': data
          }
        });
        break;
      case 'contact':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.contact': data
          }
        });
        break;
      case 'project':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.project': data
          }
        });
        break;
      case 'product':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.product': data
          }
        });
        break;
    }

    var collName = '';
    switch (cfEntity) {
      case 'company':
        collName = 'companies';
        break;
      case 'contact':
        collName = 'contacts';
        break;
      case 'project':
        collName = 'projects';
        break;
      case 'product':
        collName = 'products';
        break;
    }

    var targets = Collections[collName].find({}).fetch();

    _.each(targets, function(tx) {
      var nameExists = false;
      var cfMaster = [];

      if (tx.extendedInformation) {
        for (var cf in tx.extendedInformation) {
          if (tx.extendedInformation.hasOwnProperty(cf)) {
            if (tx.extendedInformation[cf].dataName === cfName) {
              nameExists = true;
              break;
            }
            cfMaster.push(tx.extendedInformation[cf]);
          }
        }
      }

      if (!nameExists) {
        var settings = {
          "dataName": cfName,
          "dataValue": cfValue,
          "dataType": cfType,
          "isGlobal": true,
          dataOrder: orderValue
        };
        cfMaster.push(settings);

        if (collName === 'companies') {
          Companies.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'contacts') {
          Contacts.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'projects') {
          Projects.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'products') {
          Products.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }
      }
    });

    Modal.hide();
  }
});
