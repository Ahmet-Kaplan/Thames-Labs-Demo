Template.createTaskHelper.onRendered(function() {
  $('#create-task-toggle').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size: 'small',
    onstyle: 'primary',
    offstyle: 'default'
  });

  $('#create-task-toggle').bootstrapToggle('off');
  $('#helperContent').hide();
});

Template.createTaskHelper.events({
  'change #create-task-toggle': function(e, t) {
    if ($('#create-task-toggle').prop('checked')) {
      $('#helperContent').show();
      $('#helperContent .taskdatetimepicker').datetimepicker({
        minDate: moment(),
        defaultDate: moment().add(1, 'd')
      });
    } else {
      $('#helperContent').hide();
    }
  }
});