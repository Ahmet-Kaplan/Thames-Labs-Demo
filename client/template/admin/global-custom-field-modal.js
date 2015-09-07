Template.addNewGlobalCustomField.onRendered(function() {
  $('#select-entity').selectize({
    create: true,
    allowEmptyOption: false
  });
});

Template.addNewGlobalCustomField.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();

  $('#typeText').prop('checked', true);
  $('#typeCheckbox').prop('checked', false);
  $('#typeDate').prop('checked', false);

  $('#text-input-area').show();
  $('#check-input-area').hide();
  $('#date-input-area').hide();
});

Template.addNewGlobalCustomField.helpers({

});

Template.addNewGlobalCustomField.events({
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
    var cfEntity = $('#select-entity').val();

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

    var exists = GlobalCustomFields.findOne({
      name: cfName,
      targetEntity: cfEntity
    });
    if (!exists) {
      GlobalCustomFields.insert({
        name: cfName,
        type: cfType,
        defaultValue: cfValue,
        targetEntity: cfEntity
      });
      Modal.hide();
    } else {
      toastr.warning('A global custom field for that entity type already exists.')
    }

  }
});
