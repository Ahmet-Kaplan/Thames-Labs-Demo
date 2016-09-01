import './modal.js';
import './import.html';

// Template variables
var entityToImport = '';

Template.importCollection.onCreated(function() {
  //Get entity type from template
  entityToImport = this.data.entity;
});

Template.importCollection.events({
  'click #upload-link': function(event, template) {
    document.getElementById('data-upload').click();
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