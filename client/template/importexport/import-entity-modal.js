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
});

Template.importEntityModal.onRendered(function() {
  $('#fieldMapper').show();
  $('#progressIndicator').hide();

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
    return 0;
  }
});

Template.importEntityModal.events({
  'click #startImport': function(event, template) {
    var customFields = template.selectOptions;
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
          console.log(result[0].fieldLabel + " is a required field. Please assign it a value from the list.");
          requiredFieldsCompleted = false;
          return;
        }
      }
    });

    if (requiredFieldsCompleted) {
      // ----------------------------------------------------------
      // MOVE THIS TO JUST BEFORE IMPORT STARTS    
      // ----------------------------------------------------------
      $('#startImport').prop('disabled', true);
      $('#fieldMapper').hide();
      $('#progressIndicator').show();
      $('.modal-header').hide();
      $('.modal-footer').hide();
      // ----------------------------------------------------------
    }
  }
});