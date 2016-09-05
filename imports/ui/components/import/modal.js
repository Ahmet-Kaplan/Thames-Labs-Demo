import './modal.html';

var opportunityFields = [{
  fieldLabel: 'Name',
  fieldIdentifier: 'name',
  required: true
}, {
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: true
}, {
  fieldLabel: 'Date',
  fieldIdentifier: 'date',
  required: true
}, {
  fieldLabel: 'Estimated Close Date',
  fieldIdentifier: 'estCloseDate',
  required: false
}, {
  fieldLabel: 'Value',
  fieldIdentifier: 'value',
  required: false
}, {
  fieldLabel: 'Company Name',
  fieldIdentifier: 'companyName',
  required: true
}, {
  fieldLabel: 'Contact Name',
  fieldIdentifier: 'contactName',
  required: true
}, {
  fieldLabel: 'Sales Manager',
  fieldIdentifier: 'salesManager',
  required: false
}, {
  fieldLabel: 'Is Opportunity Closed',
  fieldIdentifier: 'isArchived',
  required: false
}, {
  fieldLabel: 'Is Opportunity Won',
  fieldIdentifier: 'isArchived',
  required: false
}];

var projectFields = [{
  fieldLabel: 'Name',
  fieldIdentifier: 'name',
  required: true
}, {
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: false
}, {
  fieldLabel: 'Company Name',
  fieldIdentifier: 'companyName',
  required: true
}, {
  fieldLabel: 'Contact Name',
  fieldIdentifier: 'contactName',
  required: true
}, {
  fieldLabel: 'Account Manager',
  fieldIdentifier: 'accountManager',
  required: true
}, {
  fieldLabel: 'Due Date',
  fieldIdentifier: 'dueDate',
  required: true
}, {
  fieldLabel: 'Value',
  fieldIdentifier: 'value',
  required: false
}, {
  fieldLabel: 'Staff',
  fieldIdentifier: 'staff',
  required: false
}, {
  fieldLabel: 'Active',
  fieldIdentifier: 'active',
  required: false
}];

var productFields = [{
  fieldLabel: 'Name',
  fieldIdentifier: 'name',
  required: true
}, {
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: true
}, {
  fieldLabel: 'Sales Price',
  fieldIdentifier: 'price',
  required: false
}, {
  fieldLabel: 'Cost Price',
  fieldIdentifier: 'cost',
  required: false
}];

var activityFields = [{
  fieldLabel: 'Type',
  fieldIdentifier: 'type',
  required: true
}, {
  fieldLabel: 'Date',
  fieldIdentifier: 'date',
  required: false
}, {
  fieldLabel: 'Notes',
  fieldIdentifier: 'notes',
  required: true
}, {
  fieldLabel: 'Record Name',
  fieldIdentifier: 'record',
  required: true
}, {
  fieldLabel: 'Record Type',
  fieldIdentifier: 'recordType',
  required: true
}];

var purchaseFields = [{
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: true
}, {
  fieldLabel: 'Company Name',
  fieldIdentifier: 'companyName',
  required: true
}, {
  fieldLabel: 'Contact Name',
  fieldIdentifier: 'contactName',
  required: true
}, {
  fieldLabel: 'Supplier Reference',
  fieldIdentifier: 'supplierReference',
  required: false
}, {
  fieldLabel: 'Order Date',
  fieldIdentifier: 'orderDate',
  required: false
}, {
  fieldLabel: 'Payment Method',
  fieldIdentifier: 'paymentMethod',
  required: false
}, {
  fieldLabel: 'Status',
  fieldIdentifier: 'status',
  required: false
}, {
  fieldLabel: 'Notes',
  fieldIdentifier: 'notes',
  required: false
}];

var taskFields = [{
  fieldLabel: 'Title',
  fieldIdentifier: 'title',
  required: true
}, {
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: false
}, {
  fieldLabel: 'Assigned User',
  fieldIdentifier: 'assignee',
  required: true
}, {
  fieldLabel: 'Due Date',
  fieldIdentifier: 'dueDate',
  required: false
}, {
  fieldLabel: 'Record Name',
  fieldIdentifier: 'record',
  required: true
}, {
  fieldLabel: 'Record Type',
  fieldIdentifier: 'recordType',
  required: true
}];

var contactFields = [{
  fieldLabel: 'Forename',
  fieldIdentifier: 'forename',
  required: true
}, {
  fieldLabel: 'Surname',
  fieldIdentifier: 'surname',
  required: true
}, {
  fieldLabel: 'Job Title',
  fieldIdentifier: 'jobtitle',
  required: false
}, {
  fieldLabel: 'Telephone',
  fieldIdentifier: 'phone',
  required: false
}, {
  fieldLabel: 'Mobile',
  fieldIdentifier: 'mobile',
  required: false
}, {
  fieldLabel: 'Email',
  fieldIdentifier: 'email',
  required: false
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
  fieldLabel: 'Company Name',
  fieldIdentifier: 'companyName',
  required: false
}, {
  fieldLabel: 'Tags',
  fieldIdentifier: 'tags',
  required: false
}];

var companyFields = [{
  fieldLabel: 'Company Name',
  fieldIdentifier: 'name',
  required: true
}, {
  fieldLabel: 'Address',
  fieldIdentifier: 'address',
  required: false
}, {
  fieldLabel: 'Address 2',
  fieldIdentifier: 'address2',
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
}, {
  fieldLabel: 'Tags',
  fieldIdentifier: 'tags',
  required: false
}];

Template.importEntityModal.onCreated(function() {
  this.selectOptions = this.data.dataSet.meta.fields;
  this.dataToImport = this.data.dataSet.data;
  this.entityType = this.data.entity;
  this.unusedAsCustoms = new ReactiveVar(true);
  this.entityGCFs = new ReactiveArray();
  var self = this;

  this.autorun(function() {
    var target = "company";
    switch(this.entity) {
      case 'companies':
        target = 'company';
        break;
      case 'contacts':
        target = 'contact';
        break;
      case 'projects':
        target = 'project';
        break;
      case 'products':
        target = 'product';
        break;
    }

    Meteor.call('customFields.getGlobalsByTenantEntity', Meteor.user().group, target, function(err, res) {
      _.each(res, function(gcf) {
        if (gcf.type !== "label") {
          gcf.fieldIdentifier = 'GCF-' + gcf.name.replace(' ', '_') + '-';
          self.entityGCFs.push(gcf);

          $('#' + gcf.fieldIdentifier + '.selectpicker').selectpicker({
            title: 'Do not import',
            selectOnTab: true
          });
        }
      });
    });


  });
});

Template.importEntityModal.onRendered(function() {
  var self = this;

  UserSession.set('importProgress', 0);

  $('#mode-toggle').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size: 'mini',
    onstyle: 'primary',
    offstyle: 'warning'
  });

  if (this.entityType === 'tasks') {
    $('#mode-toggle').bootstrapToggle('off');
    $('#mode-toggle').bootstrapToggle('disable');
    $(".customFieldSwitch").hide();
  }

  $('#fieldMapper').show();
  $('#progressIndicator').hide();
  $('#closeErrors').hide();
  $('.errorOutput').hide();

  $('.selectpicker').selectpicker({
    title: 'Do not import',
    selectOnTab: true
  });

  $('.selectpicker').each(function(i, obj) {
    _.each(self.selectOptions, function(option) {
      if (option === obj.id.replace('Selector', '')) {
        $('#' + obj.id).selectpicker('val', option);
      }
    });
  });

  _.each(self.entityGCFs, function(gcf) {
    if (gcf.type !== "label") {
      _.each(self.selectOptions, function(option) {
        if (option.toLowerCase() === gcf.name.toLowerCase()) {
          $('#' + gcf.fieldIdentifier + 'Selector').selectpicker('val', option.toLowerCase());
        }
      });
    }
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
      case 'contacts':
        return contactFields;
      case 'tasks':
        return taskFields;
      case 'opportunities':
        return opportunityFields;
      case 'projects':
        return projectFields;
      case 'products':
        return productFields;
      case 'purchaseorders':
        return purchaseFields;
      case 'activities':
        return activityFields;
    }
  },
  'csvHeaders': function() {
    return Template.instance().selectOptions;
  },
  'percentComplete': function() {
    return UserSession.get('importProgress');
  },
  'entityGlobalFields': function() {
    return Template.instance().entityGCFs.array();
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
    var unusedAsCustoms = template.unusedAsCustoms.get();
    var selectedValues = [];
    var selectedGCFs = [];
    var requiredFieldsCompleted = true;

    $('.selectpicker').each(function(i, obj) {
      var objectIdentifier = obj.id;
      var isGCFSelector = objectIdentifier.indexOf("GCF-") > -1;

      if(!isGCFSelector) {
        if (obj.value !== "") {
          var cfIndex = customFields.indexOf(obj.value);
          if (cfIndex > -1) customFields.splice(cfIndex, 1);
          var setting = {
            schemaField: obj.id.replace('Selector', ''),
            importField: obj.value
          };
          selectedValues.push(setting);
        } else {
          var result = null;
          if (entityType === "companies") {
            result = $.grep(companyFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "contacts") {
            result = $.grep(contactFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "tasks") {
            result = $.grep(taskFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "opportunities") {
            result = $.grep(opportunityFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "projects") {
            result = $.grep(projectFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "purchaseorders") {
            result = $.grep(purchaseFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "products") {
            result = $.grep(productFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          } else if (entityType === "activities") {
            result = $.grep(activityFields, function(e) {
              return e.fieldIdentifier == obj.id.replace('Selector', '');
            });
          }

          if (result[0].required === true) {
            toastr.warning(result[0].fieldLabel + " is a required field. Please assign it a value from the list.");
            requiredFieldsCompleted = false;
            return;
          }
        }
      } else {
        if (obj.value !== "") {
          var gcfIndex = customFields.indexOf(obj.value);
          if (gcfIndex > -1) customFields.splice(gcfIndex, 1);
          var gcfSetting = {
            schemaField: obj.id.replace('-Selector', '').replace('GCF-', '').replace('_', ' '),
            fieldValue: obj.value
          };
          selectedGCFs.push(gcfSetting);
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

      Meteor.call('import.do', dataToImport, entityType, selectedValues, Meteor.userId(), selectedGCFs, (unusedAsCustoms ? customFields : []), function(error, result) {
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

            var warningCount = (errors.toString().match(/WARNING/g) ? errors.toString().match(/WARNING/g).length : 0);
            var errorCount = errors.length - warningCount;

            toastr.warning('Import completed with ' + warningCount + ' warnings and ' + errorCount + ' errors.');

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