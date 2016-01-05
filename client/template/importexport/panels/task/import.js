Template.taskDataManagement.events({
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('tasks');
  },
  'click #task-template-help': function(event) {
    event.preventDefault();
    Modal.show('importTaskHelpModal');
  },
  'click #task-data-upload-link': function() {
    document.getElementById('task-data-upload').click();
  },
  'change #task-data-upload': function() {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
    };
    reader.onload = function() {
      // var data = reader.result;
      // var options = {
      //   delimiter: "",
      //   newline: "",
      //   header: true,
      //   skipEmptyLines: true
      // };
      //var unprocessed = Papa.parse(data, options);

      //Do some interesting things here
      toastr.info('Doing something interesting...');
    };

    reader.readAsText(file);
    $('#task-data-upload').val('');
  }
});
