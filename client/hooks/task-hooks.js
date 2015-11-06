AutoForm.hooks({
  newTaskForm: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        if (doc.remindMe && doc.reminder) {
          var reminderDate = moment(doc.reminder);
          var dueDate = moment(doc.dueDate);
          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.')
            return false;
          } else if(dueDate && reminderDate.isAfter(dueDate)) {
            toastr.error('The reminder date is after the due Date.');
            return false;
          }
        } else if(doc.remindMe && !doc.reminder) {
          toastr.error('No date has been specified for the reminder.');
          return false;
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
      Modal.hide('');
      toastr.success('Task created.');
      FlowRouter.go('/tasks/' + result)
      //logEvent('info', 'Task created.');
    }
  },
  editTaskForm: {
    before: {
      update: function(doc) {
        if (doc.$set.remindMe && doc.$set.reminder) {
          var reminderDate = moment(doc.$set.reminder);
          var dueDate = moment(doc.$set.dueDate);
          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.')
            return false;
          } else if(dueDate && reminderDate.isAfter(dueDate)) {
            toastr.error('The reminder date is after the due Date.');
            return false;
          }
        } else if (doc.$set.remindMe && !doc.$set.reminder) {
          toastr.error('No date has been specified for the reminder.');
          return false;
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
      Modal.hide('');
      toastr.success('Task updated.');
      //logEvent('info', 'Task updated.');
    }
  }
})