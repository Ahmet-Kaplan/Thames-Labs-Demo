AutoForm.hooks({
  newTaskForm: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        if (doc.dueDate && doc.remindMe) {
          if (!$('#reminderValue').val()) {
            toastr.error('Invalid time for the reminder.');
            return false;
          }
          var reminderValue = $('#reminderValue').val();
          var reminderUnit = $('#reminderUnit').val();
          var reminderDate = moment(doc.dueDate).subtract(parseInt(reminderValue), reminderUnit);

          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.')
            return false;
          }

          doc.reminder = reminderValue + '.' + reminderUnit;
        }

        if(doc.entityId === undefined || doc.entityType === undefined || doc.assigneeId === undefined) {
          return new Error();
        }
        return doc;
      }
    },
    onError: function(formType, error) {
      if (error) {
        toastr.error('An error occurred: Task not created.');
        //logEvent('error', 'Task not created: ' + error);
      }
    },
    onSuccess: function(formType, result) {
      $('input[name=dueDate]').data("DateTimePicker").hide();
      Modal.hide('');
      toastr.success('Task created.');
      FlowRouter.go('/tasks/' + result)
      //logEvent('info', 'Task created.');
    }
  },
  editTaskForm: {
    before: {
      update: function(doc) {
        if (doc.$set.dueDate && doc.$set.remindMe) {
          if (!$('#reminderValue').val()) {
            toastr.error('Invalid time for the reminder.');
            return false;
          }
          var reminderValue = $('#reminderValue').val();
          var reminderUnit = $('#reminderUnit').val();
          var reminderDate = moment(doc.$set.dueDate).subtract(parseInt(reminderValue), reminderUnit);

          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.')
            return false;
          }

          doc.$set.reminder = reminderValue + '.' + reminderUnit;
        }
        return doc;
      }
    },
    onError: function(formType, error) {
      if (error) {
        toastr.error('An error occurred: Task not updated.');
        //logEvent('error', 'Task not updated: ' + error);
      }
    },
    onSuccess: function() {
      $('input[name=dueDate]').data("DateTimePicker").hide();
      Modal.hide('');
      toastr.success('Task updated.');
      //logEvent('info', 'Task updated.');
    }
  }
})