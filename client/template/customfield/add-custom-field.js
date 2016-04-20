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
    $('#submit-custom-field').prop('disabled', true);
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

    var nameExists = false;

    if (CustomFields.findOne({
        entityId: this.entity_data._id,
        name: cfName
      })) {
      nameExists = true;
    }

    var recordFields = CustomFields.find({
      entityId: this.entity_data._id
    }).fetch();
    var maxValue = -1;
    _.each(recordFields, function(x) {
      if (x.order > maxValue) maxValue = x.order;
    });


    if (!nameExists) {
      var entityType = this.entity_type;
      var entityId = this.entity_data._id;

      Meteor.call('customFields.create', cfName, cfValue, cfType, maxValue, entityType, entityId, function(err, res) {
        if (err) {
          toastr.error(err);
        }
        if (res) {
          toastr.success('Custom field added.');
        }
      });
    } else {
      toastr.error('An custom field with that name has already been added.');
      $('#submit-custom-field').prop('disabled', false);
    }

    Modal.hide();
  }
});