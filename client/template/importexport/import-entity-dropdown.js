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
        'City',
        'County',
        'Post Code',
        'Country',
        'Website',
        'Telephone'
      ].join(',');

      sampleValues = [
        'Cambridge Software Ltd',
        'St John\'s Innovation Centre',
        'Milton',
        'Cambridgeshire',
        'CB4 0WS',
        'United Kingdom',
        'http://www.cambridgesoftware.co.uk',
        '01223 802 900'
      ].join(',');
    } else {
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
        'Country'
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
    }

    var fileData = headers + '\n' + sampleValues;
    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, 'data-template.csv');
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