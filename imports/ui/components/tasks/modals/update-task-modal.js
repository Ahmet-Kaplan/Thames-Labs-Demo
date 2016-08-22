import './update-task-modal.html';
import '/imports/ui/components/autosuggest/autosuggest.js';
import './reminder-selector.js';

Template.updateTaskModal.onRendered(function() {
  Session.set('showRemindMe', this.data.remindMe);
  Session.set('hasDueDate', typeof this.data.dueDate !== "undefined");
});

Template.updateTaskModal.helpers({
  exclusions: function() {
    const excludes = [];

    excludes.push(this._id);

    const subs = ReactiveMethod.call("tasks.getSubTasks", this._id);
    if (subs && subs.length > 0) {
      _.each(subs, (s) => {
        excludes.push(s._id);
      });
    }
    return excludes.join(',');
  },
  hasDueDate: function() {
    return Session.get('hasDueDate');
  },
  showRemindMe: function() {
    return Session.get('showRemindMe');
  }
});

Template.updateTaskModal.events({
  'change input[name=dueDate]': function(e) {
    e.preventDefault();
    if ($('input[name=dueDate]').val()) {
      Session.set('hasDueDate', true);
    } else {
      Session.set('hasDueDate', false);
    }
  },
  'change input[name=remindMe]': function(e) {
    e.preventDefault();
    const remindMe = $('input[name=remindMe]').prop('checked');
    Session.set('showRemindMe', remindMe);
  }
});

AutoForm.hooks({
  insertTaskForm: {
    before: {
      insert: function(doc) {
        if (doc.dueDate && doc.remindMe) {
          if (!$('#reminderValue').val()) {
            toastr.error('Invalid time for the reminder.');
            return false;
          }

          const reminderValue = $('#reminderValue').val(),
                reminderUnit = $('#reminderUnit').val(),
                reminderDate = moment(doc.dueDate).subtract(parseInt(reminderValue, 10), reminderUnit);

          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.');
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
      if (!this.formAttributes.preventNavigateToTask) {
        FlowRouter.go('/tasks/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Task creation error: ' + error);
    }
  },
  updateTaskForm: {
    before: {
      update: function(doc) {
        if (doc.$set.dueDate && doc.$set.remindMe) {
          if (!$('#reminderValue').val()) {
            toastr.error('Invalid time for the reminder.');
            return false;
          }
          const reminderValue = $('#reminderValue').val(),
                reminderUnit = $('#reminderUnit').val(),
                reminderDate = moment(doc.$set.dueDate).subtract(parseInt(reminderValue, 10), reminderUnit);

          if (reminderDate.isBefore(moment())) {
            toastr.error('The reminder date is in the past.');
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
});
