import './modal.html';


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
