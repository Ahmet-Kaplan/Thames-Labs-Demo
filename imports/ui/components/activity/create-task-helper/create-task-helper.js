import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './create-task-helper.html';
import './create-task-helper.css';

Template.createTaskHelper.onRendered(function() {
  $('#create-task-toggle').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size: 'small',
    onstyle: 'primary',
    offstyle: 'default'
  });
  $('#add-reminder-toggle').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size: 'small',
    onstyle: 'primary',
    offstyle: 'default'
  });

  $('#create-task-toggle').bootstrapToggle('off');
  $('#add-reminder-toggle').bootstrapToggle('off');
  $('#helperContent').hide();
});

Template.createTaskHelper.events({
  'change #create-task-toggle': function(e, t) {
    if ($('#create-task-toggle').prop('checked')) {
      $('#helperContent').show();
      $('#helperContent .taskdatetimepicker').datetimepicker({
        minDate: moment(),
        defaultDate: moment().add(1, 'd'),
        format: 'DD/MM/YYYY HH:mm:ss'
      });
    } else {
      $('#helperContent').hide();
    }
  },
  'change #add-reminder-toggle': function(e, t) {
    if ($('#add-reminder-toggle').prop('checked')) {
      $('.setReminderArea').show();
    } else {
      $('.setReminderArea').hide();
    }
  }
});
