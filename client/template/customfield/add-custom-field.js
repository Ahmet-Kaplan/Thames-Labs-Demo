var editor = null;

Template.addCustomField.onRendered(function() {

  $.getScript('/vendor/medium/medium-editor.min.js');

  this.$('.datetimepicker').datetimepicker();

  $('#typeText').prop('checked', true);
  $('#typeAdvText').prop('checked', false);
  $('#typeCheckbox').prop('checked', false);
  $('#typeDate').prop('checked', false);

  $('#text-input-area').show();
  $('#advtext-input-area').hide();
  $('#check-input-area').hide();
  $('#date-input-area').hide();
});

Template.addCustomField.events({
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
  'click #submit-custom-field': function() {
    var cfName = $('#custom-field-name').val();
    var cfValue = "value";
    var cfType = "text";

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
      toastr.success('Extended information field added.');
    } else {
      toastr.error('An extended information field with that name has already been added.');
    }

    Modal.hide();
  }
});
