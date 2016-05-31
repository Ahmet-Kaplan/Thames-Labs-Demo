var companyFields = [{
  fieldLabel: 'Company Name',
  fieldIdentifier: 'name',
  required: true
}, {
  fieldLabel: 'Address',
  fieldIdentifier: 'address',
  required: false
}, {
  fieldLabel: 'City',
  fieldIdentifier: 'city',
  required: false
}, {
  fieldLabel: 'County',
  fieldIdentifier: 'county',
  required: false
}, {
  fieldLabel: 'Postcode',
  fieldIdentifier: 'postcode',
  required: false
}, {
  fieldLabel: 'Country',
  fieldIdentifier: 'country',
  required: false
}, {
  fieldLabel: 'Website',
  fieldIdentifier: 'website',
  required: false
}, {
  fieldLabel: 'Telephone Number',
  fieldIdentifier: 'phone',
  required: false
}];

Template.importEntityModal.onCreated(function() {
  this.selectOptions = this.data.dataSet.meta.fields;
  this.dataToImport = this.data.dataSet.data;
  this.entityType = this.data.entity;
  this.unusedAsCustoms = new ReactiveVar(true);
});

Template.importEntityModal.onRendered(function() {
  $('#mode-toggle').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size: 'mini',
    onstyle: 'primary',
    offstyle: 'warning'
  });

  $('#fieldMapper').show();
  $('#progressIndicator').hide();
  $('#closeErrors').hide();
  $('.errorOutput').hide();

  $('.selectpicker').selectpicker({
    title: 'Do not import',
    selectOnTab: true
  });
});

Template.importEntityModal.helpers({
  'entityType': function() {
    return this.entity;
  },
  'importFields': function() {
    switch (this.entity) {
      case 'companies':
        return companyFields;
    }
  },
  'csvHeaders': function() {
    return Template.instance().selectOptions;
  },
  percentComplete: function() {
    return UserSession.get('importProgress');
  }
});

Template.importEntityModal.events({
  'click #closeErrors': function(event, template) {
    Modal.hide();
  },
  'change #mode-toggle': function(event, template) {
    var state = template.unusedAsCustoms.get();
    template.unusedAsCustoms.set(!state);
  },
  'click #startImport': function(event, template) {
    UserSession.set("importErrors", []);

    var customFields = template.selectOptions;
    var dataToImport = template.dataToImport;
    var entityType = template.entityType;
    var selectedValues = [];
    var requiredFieldsCompleted = true;

    $('.selectpicker').each(function(i, obj) {
      if (obj.value !== "") {
        var cfIndex = customFields.indexOf(obj.value);
        if (cfIndex > -1) customFields.splice(cfIndex, 1);
        var setting = {
          schemaField: obj.id.replace('Selector', ''),
          fieldValue: obj.value
        };
        selectedValues.push(setting);
      } else {
        var result = $.grep(companyFields, function(e) {
          return e.fieldIdentifier == obj.id.replace('Selector', '');
        });
        if (result[0].required === true) {
          toastr.warning(result[0].fieldLabel + " is a required field. Please assign it a value from the list.");
          requiredFieldsCompleted = false;
          return;
        }
      }
    });

    if (requiredFieldsCompleted) {
      UserSession.set("importProgress", 0);

      $('#startImport').prop('disabled', true);
      $('#fieldMapper').hide();
      $('#progressIndicator').show();
      $('.modal-header').hide();
      $('.modal-footer').hide();

      Meteor.call('import.do', Meteor.userId(), entityType, dataToImport, selectedValues, customFields, function(error, result) {
        if (error) {
          toastr.error(error);
          $('#startImport').prop('disabled', false);
          $('#fieldMapper').show();
          $('#progressIndicator').hide();
          $('.modal-header').show();
          $('.modal-footer').show();
        }

        if (result) {
          $('.progress').hide();

          var errors = UserSession.get("importErrors");
          if (errors.length > 0) {
            $('.errorOutput').show();
            var errorHTML = '';
            _.each(errors, function(em) {
              errorHTML += "<li>" + em + "</li>";
            });
            $('#errorList').html(errorHTML);
            toastr.warning('Some errors occurred.');

            $('#closeErrors').show();
          } else {
            toastr.success('Your data was imported successfully.');
            Modal.hide();
          }
        }
      });
    }
  }
});