Template.taskDataManagement.events({
  'click #task-template': function() {
    var headers = [
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

    var fileData = headers + '\n' + samplePersonalValues + '\n' + sampleCompanyValues + '\n' + sampleContactValues + '\n' + sampleOpportunityValues + '\n' + sampleProjectValues;
    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, 'task-template.csv');
  },
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

    var patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    var fileName = file.name;
    var match = (fileName).match(patt1);

    if (match) {
      if (match[1].toLowerCase() !== "csv") {
        toastr.error('Only CSV files can be used to import data');
        return
      }
    } else {
      toastr.error('Could not detect file type.');
      return;
    }

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
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
      var tasksToImport = unprocessed.data;

      //Do some interesting things here
      Meteor.call('tasks.import', tasksToImport, function(err, res) {
        if (err) throw new Meteor.Error(err);
        if (res.exitCode === 0) {
          toastr.success('Tasks successfully imported.');
        } else {
          toastr.error(res.message);
          Modal.show('importTaskFailuresModal', res.errorData);
        }
      })
    };

    reader.readAsText(file);
    $('#task-data-upload').val('');
  }
});
