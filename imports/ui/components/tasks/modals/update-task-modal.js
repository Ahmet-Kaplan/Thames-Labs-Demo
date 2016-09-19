import './update-task-modal.html';
import '/imports/ui/components/autosuggest/autosuggest.js';
import './reminder-selector.js';
import { Tasks } from '/imports/api/collections.js';

Template.updateTaskModal.onCreated(function() {
  this.showRemindMe = new ReactiveVar(this.data.remindMe);
  this.hasDueDate = new ReactiveVar(typeof this.data.dueDate !== "undefined");
  this.subscribe('subTasksByTaskId', this.data._id);
});

Template.updateTaskModal.helpers({
  exclusions: function() {
    const excludes = [];

    excludes.push(this._id);
    const subs = Tasks.find({parentTaskId: Template.currentData()._id}).fetch();
    _.each(subs, (s) => {
      excludes.push(s._id);
    });

    return excludes.join(',');
  },
  hasDueDate: function() {
    return Template.instance().hasDueDate.get();
  },
  showRemindMe: function() {
    return Template.instance().showRemindMe.get(
    );
  }
});

Template.updateTaskModal.events({
  'blur input[name=dueDate]': function(e) {
    e.preventDefault();
    if ($('input[name=dueDate]').val()) {
      Template.instance().hasDueDate.set(true);
    } else {
      Template.instance().hasDueDate.set(false);
    }
  },
  'change input[name=remindMe]': function(e) {
    e.preventDefault();
    const remindMe = $('input[name=remindMe]').prop('checked');
    Template.instance().showRemindMe.set(remindMe);
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
