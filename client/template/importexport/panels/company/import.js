Template.companyDataManagement.events({
  'click #company-template-help': function(event) {
    event.preventDefault();
    Modal.show('importCompanyHelpModal');
  },
  'click #company-template-download-link': function() {
    generateCompanyImportTemplate();
  },
  'click #company-data-upload-link': function() {
    document.getElementById('company-data-upload').click();
  },
  'change #company-data-upload': function() {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
    }
    reader.onload = function() {
      var data = reader.result;
      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);

      var requiredData = {
        type: 'Company',
        dataSet: unprocessed,
        reqdFields: ['name', 'address', 'city', 'county', 'postcode', 'country', 'website', 'phone']
      };

      Modal.show('importMapper', requiredData);
    }

    reader.readAsText(file);
  }
});

generateCompanyImportTemplate = function() {
  var tempFile = [];
  var entry = {
    name: "Sample",
    address: "123 Sample Street",
    address2: "Samplesville",
    city: "Sampleton",
    county: "Sampleford",
    postcode: "SM13 0AB",
    country: "United Kingdom",
    website: "http://www.sample.co.uk",
    phone: "01234 567 890"
  };

  tempFile.push(entry);

  var filename = 'realtimecrm-company-import-template.csv';
  var fileData = Papa.unparse(tempFile);

  var blob = new Blob([fileData], {
    type: "text/csv;charset=utf-8"
  });
  saveAs(blob, filename);
}
