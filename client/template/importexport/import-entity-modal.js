var companyFields = [{
  fieldLabel: 'Company Name',
  fieldIdentifier: 'CompanyName',
}, {
  fieldLabel: 'Address',
  fieldIdentifier: 'CompanyAddress',
}, {
  fieldLabel: 'City',
  fieldIdentifier: 'CompanyCity',
}, {
  fieldLabel: 'County',
  fieldIdentifier: 'CompanyCounty',
}, {
  fieldLabel: 'Postcode',
  fieldIdentifier: 'CompanyPostcode',
}, {
  fieldLabel: 'Country',
  fieldIdentifier: 'CompanyCountry',
}, {
  fieldLabel: 'Website',
  fieldIdentifier: 'CompanyWebsite',
}, {
  fieldLabel: 'Telephone Number',
  fieldIdentifier: 'CompanyTelephone',
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
    $('#startImport').prop('disabled', true);
    $('#fieldMapper').hide();
    $('#progressIndicator').show();
    $('.modal-header').hide();
    $('.modal-footer').hide();

    var customFields = template.selectOptions;

    $('.selectpicker').each(function(i, obj) {
      var cfIndex = customFields.indexOf(obj.value);
      if (cfIndex > -1) customFields.splice(cfIndex, 1);
    });

    
  }
});