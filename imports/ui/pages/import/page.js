import './page.html';

const selectorFields = [{
  fieldLabel: 'Title',
  fieldIdentifier: 'title',
  required: true,
  types: ["task"]
}, {
  fieldLabel: 'Description',
  fieldIdentifier: 'description',
  required: false,
  types: ["task"]
}, {
  fieldLabel: 'Assigned User',
  fieldIdentifier: 'assignee',
  required: true,
  types: ["task"]
}, {
  fieldLabel: 'Due Date',
  fieldIdentifier: 'dueDate',
  required: false,
  types: ["task"]
}, {
  fieldLabel: 'Record Name',
  fieldIdentifier: 'record',
  required: true,
  types: ["task"]
}, {
  fieldLabel: 'Record Type',
  fieldIdentifier: 'recordType',
  required: true,
  types: ["task"]
}, {
  fieldLabel: 'Forename',
  fieldIdentifier: 'forename',
  required: true,
  types: ["contact"]
}, {
  fieldLabel: 'Surname',
  fieldIdentifier: 'surname',
  required: true,
  types: ["contact"]
}, {
  fieldLabel: 'Job Title',
  fieldIdentifier: 'jobtitle',
  required: false,
  types: ["contact"]
}, {
  fieldLabel: 'Telephone',
  fieldIdentifier: 'phone',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'Mobile',
  fieldIdentifier: 'mobile',
  required: false,
  types: ["contact"]
}, {
  fieldLabel: 'Email',
  fieldIdentifier: 'email',
  required: false,
  types: ["contact"]
}, {
  fieldLabel: 'Name',
  fieldIdentifier: 'companyName',
  required: true,
  types: ["company"]
}, {
  fieldLabel: 'Address',
  fieldIdentifier: 'address',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'City',
  fieldIdentifier: 'city',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'County',
  fieldIdentifier: 'county',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'Postcode',
  fieldIdentifier: 'postcode',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'Country',
  fieldIdentifier: 'country',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'Company Name',
  fieldIdentifier: 'companyName',
  required: false,
  types: ["contact"]
}, {
  fieldLabel: 'Tags',
  fieldIdentifier: 'tags',
  required: false,
  types: ["company","contact"]
}, {
  fieldLabel: 'Website',
  fieldIdentifier: 'website',
  required: false,
  types: ["company"]
}];

Session.setDefault('selectOptions', null);
Session.setDefault('unusedAsCustoms', true);
Session.setDefault('entityGCFs', null);
Session.setDefault('entityType', null);

Template.fullPageImport.onCreated(function() {  
  this.dataSet = null;
  this.dataToImport = null;
});

Template.fullPageImport.onRendered(function() {

  $('#entity-selector-div').hide();
  $('#fieldMapper').hide();
  $('#progressIndicator').hide();
  $('#closeErrors').hide();
  $('.errorOutput').hide();
});

Template.fullPageImport.events({
  'click #upload-link': function(event, template) {
    document.getElementById('data-upload').click();
  },
  'change #data-upload': function(event, template) {
    const file = event.target.files[0];

    if (!file) return;

    const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const fileName = file.name;
    const match = (fileName).match(patt1);

    if (match) {
      if (match[1].toLowerCase() !== "csv") {
        toastr.error('Only CSV files can be used to import data');
        return;
      }
    } else {
      toastr.error('Could not detect file type.');
      return;
    }

    const reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error(error, "File Read Error");
    };
    reader.onload = function() {
      const data = reader.result;
      const options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      const unprocessed = Papa.parse(data, options);

      template.dataSet = unprocessed;
      template.dataToImport = template.dataSet.data;

      Session.set('selectOptions', template.dataSet.meta.fields);

      $('#entity-selector-div').show();
    };

    reader.readAsText(file);
    $('#data-upload').val('');
  },
  'change #entity-selector': function(e, t) {
    $('#fieldMapper').hide();

    Session.set('entityType', e.target.id);
    const currType = Session.set('entityType');

    if (currType === "company") { 
      $('#companyFieldSelectors').show();
    } else {
      $('#companyFieldSelectors').hide();
    }

    if (currType === "contact") { 
      $('#contactFieldSelectors').show();
    } else {
      $('#contactFieldSelectors').hide();
    }

    if (currType === "task") { 
      $('#taskFieldSelectors').show();
    }else{
      $('#taskFieldSelectors').hide();
    }

    Meteor.call('customFields.getGlobalsByTenantEntity', Meteor.user().group, currType, function(err, res) {
      const arr = [];

      _.each(res, function(gcf) {
        if (gcf.type !== "label") {
          gcf.fieldIdentifier = 'GCF-' + gcf.name.replace(' ', '_') + '-';
          arr.push(gcf);

          // $('#' + gcf.fieldIdentifier + '.selectpicker').selectpicker({
          //   title: 'Do not import',
          //   selectOnTab: true
          // });
        }
      });
      Session.set('entityGCFs', arr);
    });

    $('#mode-toggle').bootstrapToggle({
      on: 'Yes',
      off: 'No',
      size: 'mini',
      onstyle: 'primary',
      offstyle: 'warning'
    });
    $('#overwrite-toggle').bootstrapToggle({
      on: 'On',
      off: 'Off',
      size: 'mini',
      onstyle: 'primary',
      offstyle: 'warning'
    });
    $('#overwrite-toggle').bootstrapToggle('off');

    if (currType === 'task') {
      $('#mode-toggle').bootstrapToggle('off');
      $('#mode-toggle').bootstrapToggle('disable');
      $(".customFieldSwitch").hide();
    } else {
      $('#mode-toggle').bootstrapToggle('on');
      $('#mode-toggle').bootstrapToggle('enable');
      $(".customFieldSwitch").show();
    }

    $('.selectpicker').selectpicker({
      title: 'Do not import',
      selectOnTab: true
    });

    $('.selectpicker').each(function(i, obj) {
      _.each(Session.get('selectOptions'), function(option) {
        if (option === obj.id.replace('Selector', '')) {
          $('#' + obj.id).selectpicker('val', option);
        }
      });
    });

    _.each(Session.get('entityGCFs'), function(gcf) {
      if (gcf.type !== "label") {
        _.each(Session.get('selectOptions'), function(option) {
          if (option.toLowerCase() === gcf.name.toLowerCase()) {
            $('#' + gcf.fieldIdentifier + 'Selector').selectpicker('val', option.toLowerCase());
          }
        });
      }
    });

    $('#fieldMapper').show();
  }
});


Template.fullPageImport.helpers({
  'percentComplete': function() {
    return UserSession.get('importProgress');
  },
  'csvHeaders': function() {
    return Session.get('selectOptions');
  },
  'entityGlobalFields': function() {
    return Session.get('selectOptions');
  },
  'companyImportFields': function() {
    const fields = _(selectorFields).filter((x) => _.indexOf(x.types, "company") > -1).value();
    return fields;
  },
  'contactImportFields': function() {
    const fields = _(selectorFields).filter((x) => _.indexOf(x.types, "contact") > -1).value();
  },
  'taskImportFields': function() {
    const fields = _(selectorFields).filter((x) => _.indexOf(x.types, "task") > -1).value();
  },
});