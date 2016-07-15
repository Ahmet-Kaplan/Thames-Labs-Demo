// Template variables
var entityToImport = '';

Template.importEntityDropdown.onCreated(function() {
  //Get entity type from template
  entityToImport = this.data.entity;
});

Template.importEntityDropdown.events({
  'click #upload-link': function(event, template) {
    document.getElementById('data-upload').click();
  },
  'click #template-link': function(event, template) {
    var headers = [];
    var sampleValues = [];

    if (entityToImport === "companies") {
      headers = [
        'Company Name',
        'Address',
        'Address 2',
        'City',
        'County',
        'Post Code',
        'Country',
        'Website',
        'Telephone',
        'Tags'
      ].join(',');

      sampleValues = [
        'Cambridge Software Ltd',
        'St John\'s Innovation Centre',
        'Cowley Road',
        'Milton',
        'Cambridgeshire',
        'CB4 0WS',
        'United Kingdom',
        'http://www.cambridgesoftware.co.uk',
        '01223 802 900'
      ].join(',');
      var companyFileData = headers + '\n' + sampleValues;
      var companyBlob = new Blob([companyFileData], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(companyBlob, 'company-import-template.csv');
    } else if (entityToImport === "contacts") {
      headers = [
        'Forename',
        'Surname',
        'Email',
        'Telephone',
        'Mobile',
        'Job Title',
        'Company Name',
        'Address',
        'City',
        'County',
        'Post Code',
        'Country',
        'Tags'
      ].join(',');

      sampleValues = [
        'John',
        'Doe',
        'john.doe@cambridgesoftware.co.uk',
        '01234 567 890',
        '07123 456 789',
        'Team Supervisor',
        'Cambridge Software Ltd',
        'St John\'s Innovation Centre',
        'Milton',
        'Cambridgeshire',
        'CB4 0WS',
        'United Kingdom',
        'http://www.cambridgesoftware.co.uk',
        '01223 802 900'
      ].join(',');

      var contactFileData = headers + '\n' + sampleValues;
      var contactBlob = new Blob([contactFileData], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(contactBlob, 'contact-import-template.csv');
    } else if (entityToImport === "tasks") {
      headers = [
        'title',
        'description',
        'assignee',
        'dueDate',
        'record',
        'recordType',
        'tags'
      ].join(',');

      var samplePersonalValues = [
        'Sample personal task',
        'A simple example of how a personal task should be imported',
        Meteor.user().profile.name,
        moment().format('YYYY-MM-DDTHH:mm:ss'),
        Meteor.user().profile.name,
        'user',
        'Imported'
      ].join(',');
      var sampleCompanyValues = [
        'Sample company task',
        'A simple example of how a company task should be imported',
        Meteor.user().profile.name,
        moment().format('YYYY-MM-DDTHH:mm:ss'),
        '<COMPANY NAME HERE>',
        'company',
        'Imported'
      ].join(',');
      var sampleContactValues = [
        'Sample contact task',
        'A simple example of how a contact task should be imported',
        Meteor.user().profile.name,
        moment().format('YYYY-MM-DDTHH:mm:ss'),
        '<CONTACT NAME HERE>',
        'contact',
        'Imported'
      ].join(',');
      var sampleOpportunityValues = [
        'Sample opportunity task',
        'A simple example of how a opportunity task should be imported',
        Meteor.user().profile.name,
        moment().format('YYYY-MM-DDTHH:mm:ss'),
        '<OPPORTUNITY NAME HERE>',
        'opportunity',
        'Imported'
      ].join(',');
      var sampleProjectValues = [
        'Sample project task',
        'A simple example of how a project task should be imported',
        Meteor.user().profile.name,
        moment().format('YYYY-MM-DDTHH:mm:ss'),
        '<PROJECT NAME HERE>',
        'project',
        'Imported'
      ].join(',');

      var taskFileData = headers + '\n' + samplePersonalValues + '\n' + sampleCompanyValues + '\n' + sampleContactValues + '\n' + sampleOpportunityValues + '\n' + sampleProjectValues;
      var taskBlob = new Blob([taskFileData], {
        type: "text/csv;charset=utf-8"
      });
      saveAs(taskBlob, 'task-import-template.csv');
    }
  },
  'change #data-upload': function(event, template) {
    var file = event.target.files[0];

    if (!file) return;

    var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    var fileName = file.name;
    var match = (fileName).match(patt1);

    if (match) {
      if (match[1].toLowerCase() !== "csv") {
        toastr.error('Only CSV files can be used to import data');
        return;
      }
    } else {
      toastr.error('Could not detect file type.');
      return;
    }

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error(error, "File Read Error");
    };
    reader.onload = function() {
      var data = reader.result;
      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);

      Modal.show('importEntityModal', {
        entity: entityToImport,
        dataSet: unprocessed
      });
    };

    reader.readAsText(file);
    $('#data-upload').val('');
  }
});