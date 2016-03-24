AutoForm.hooks({
  newTaskForm: {
    before: {
      insert: function(doc) {
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

        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      $('input[name=dueDate]').data("DateTimePicker").hide();
      Modal.hide();
      toastr.success('Task created.');
      FlowRouter.go('/tasks/' + result);
    },
    onError: function(formType, error) {
      toastr.error('Task creation error: ' + error);
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
    onSuccess: function() {
      $('input[name=dueDate]').data("DateTimePicker").hide();
      Modal.hide();
      toastr.success('Task updated.');
    },
    onError: function(formType, error) {
      toastr.error('Task update error: ' + error);
    }
  }
})
