Template.addNewGlobalCustomField.onRendered(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');

  $('#select-entity').selectize({
    create: false,
    allowEmptyOption: false
  });

  this.$('.datetimepicker').datetimepicker();

  this.$('#custom-field-picklist-values').selectize({
    delimiter: ',',
    create: function(input) {
      return {
        value: input,
        text: input
      }
    }
  })

  $('#typeText').prop('checked', true);
  $('#typeAdvText').prop('checked', false);
  $('#typeCheckbox').prop('checked', false);
  $('#typeDate').prop('checked', false);
  $('#typeLabel').prop('checked', false);
  $('#typePicklist').prop('checked', false);

  $('#text-input-area').show();
  $('#advtext-input-area').hide();
  $('#check-input-area').hide();
  $('#date-input-area').hide();
  $('#picklist-input-area').hide();
});

Template.addNewGlobalCustomField.events({
  'click #typeText': function() {
    $('#text-input-area').show();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
    $('#picklist-input-area').hide();
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
    $('#picklist-input-area').hide();
  },
  'click #typeCheckbox': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').show();
    $('#date-input-area').hide();
    $('#picklist-input-area').hide();
  },
  'click #typeDate': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').show();
    $('#picklist-input-area').hide();
  },
  'click #typeLabel': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
    $('#picklist-input-area').hide();
  },
  'click #typePicklist': function() {
    $('#text-input-area').hide();
    $('#advtext-input-area').hide();
    $('#check-input-area').hide();
    $('#date-input-area').hide();
    $('#picklist-input-area').show();
  },
  'click #createCustomField': function() {
    $('#createCustomField').prop('disabled', true);
    var cfName = $('#custom-field-name').val();
    var cfValue = "value";
    var cfType = "text";
    var cfEntity = $('#select-entity').val();
    var freePlanMaxFlag = false;

    if (cfName === "") {
      toastr.warning('Please provide a name.');
      return;
    }
    if (cfEntity === "") {
      toastr.warning('Please select an entity.');
      return;
    }

    var fields = [];
    Meteor.call('extInfo.getTenantGlobals', cfEntity, Meteor.bindEnvironment(function(err, res) {
      if (err) throw new Meteor.Error(err);
      _.each(res, function(r) {
        fields.push(r);
      });

      if (fields.length === MAX_FREE_ENTITY_GLOBAL_FIELDS) {
        freePlanMaxFlag = true;
      }

      if (!isProTenant(Meteor.user().group) && freePlanMaxFlag === true) {
        showUpgradeToastr('To create more than 5 global custom fields for a ' + cfEntity + ' record');
        Modal.hide();
        return;
      }

      if (freePlanMaxFlag === false) {
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
        if ($('#typePicklist').prop('checked')) {
          cfType = "picklist";
          cfValue = $('#custom-field-picklist-values').selectize().val();
        }

        Meteor.call('extInfo.addNewGlobal', cfName, cfType, cfValue, cfEntity, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res === 0) {
            toastr.success('Global field created successfully.');
            Meteor.subscribe('globalCustomFields');

            Modal.hide();
          } else {
            $('#createCustomField').prop('disabled', false);
            if (res === 1) {
              toastr.error('Only admins may add global fields.');
            }
            if (res === 2) {
              toastr.error('A global custom field with that name already exists.');
            }
            if (res === 3) {
              toastr.error('No user detected');
            }
          }
        });
      }

    }));
  }
});