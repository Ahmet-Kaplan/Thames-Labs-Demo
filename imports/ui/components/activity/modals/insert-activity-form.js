import '/imports/ui/components/activity/insert-task-helper/insert-task-helper.js';
import '/imports/ui/components/autosuggest/autosuggest.js';
import './insert-activity-form.html';
import sanitizeHtml from "sanitize-html";
import { Contacts, Tasks } from '/imports/api/collections.js';

Template.insertActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});
Template.insertContactActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});
Template.insertJobActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});
Template.insertPurchaseOrderActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});
Template.insertOpportunityActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});
Template.insertTaskActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});

Template.insertActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        const setReminder = $('#add-reminder-toggle').prop('checked'),
              reminder = `${$('#reminderValue').val()}.${$('#reminderUnit').val()}`,
              d = $('#helperContent .taskdatetimepicker'),
              dtp = d.data('DateTimePicker'),
              taskDate = dtp.date().toDate();

        let taskTitle = `Follow Up ${AutoForm.getFieldValue('type', 'insertActivityForm')}`;

        const desc = sanitizeHtml(AutoForm.getFieldValue('notes', 'insertActivityForm'), {
          allowedTags: [],
          allowedAttributes: []
        });

        if (AutoForm.getFieldValue('contactId', 'insertActivityForm')) {
          const contact = Contacts.findOne({
            _id: AutoForm.getFieldValue('contactId', 'insertActivityForm')
          });
          if (contact) {
            taskTitle = `${taskTitle} with ${contact.forename} ${contact.surname}`;
            Tasks.insert({
              title: taskTitle,
              description: desc,
              dueDate: taskDate,
              assigneeId: Meteor.userId(),
              completed: false,
              remindMe: setReminder,
              reminder: (setReminder ? reminder : null),
              entityType: 'contact',
              entityId: AutoForm.getFieldValue('contactId', 'insertActivityForm'),
              createdBy: Meteor.userId()
            }, function(err) {
              if (err) toastr.error(`An error occurred whilst creating a task from this activity: ${err}`);
            });

            return;
          }
        }

        Tasks.insert({
          title: taskTitle,
          description: desc,
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: setReminder,
          reminder: (setReminder ? reminder : null),
          entityType: 'company',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error(`An error occurred whilst creating a task from this activity: ${err}`);
        });
      }
    }
  }
});

Template.insertActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertContactActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertContactActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        const setReminder = $('#add-reminder-toggle').prop('checked'),
              reminder = `${$('#reminderValue').val()}.${$('#reminderUnit').val()}`,
              d = $('#helperContent .taskdatetimepicker'),
              dtp = d.data('DateTimePicker'),
              taskDate = dtp.date().toDate(),
              taskTitle = `Follow Up ${AutoForm.getFieldValue('type', 'insertContactActivityForm')}`;

        const desc = sanitizeHtml(AutoForm.getFieldValue('notes', 'insertContactActivityForm'), {
          allowedTags: [],
          allowedAttributes: []
        });

        Tasks.insert({
          title: taskTitle,
          description: desc,
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: setReminder,
          reminder: (setReminder ? reminder : null),
          entityType: 'contact',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertContactActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error(`An error occurred whilst creating a task from this activity: ${err}`);
        });
      }
    }
  }
});

Template.insertContactActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  },
  fullName: function() {
    return `${this.contact.forename} ${this.contact.surname}`;
  }
});

Template.insertJobActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertJobActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        const setReminder = $('#add-reminder-toggle').prop('checked'),
              reminder = `${$('#reminderValue').val()}.${$('#reminderUnit').val()}`,
              d = $('#helperContent .taskdatetimepicker'),
              dtp = d.data('DateTimePicker'),
              taskDate = dtp.date().toDate(),
              taskTitle = `Follow Up ${AutoForm.getFieldValue('type', 'insertJobActivityForm')}`;

        const desc = sanitizeHtml(AutoForm.getFieldValue('notes', 'insertJobActivityForm'), {
          allowedTags: [],
          allowedAttributes: []
        });

        Tasks.insert({
          title: taskTitle,
          description: desc,
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: setReminder,
          reminder: (setReminder ? reminder : null),
          entityType: 'job',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertJobActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error(`An error occurred whilst creating a task from this activity: ${err}`);
        });
      }
    }
  }
});

Template.insertJobActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertPurchaseOrderActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertOpportunityActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertOpportunityActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        const setReminder = $('#add-reminder-toggle').prop('checked'),
              reminder = `${$('#reminderValue').val()}.${$('#reminderUnit').val()}`,
              d = $('#helperContent .taskdatetimepicker'),
              dtp = d.data('DateTimePicker'),
              taskDate = dtp.date().toDate(),
              taskTitle = `Follow Up ${AutoForm.getFieldValue('type', 'insertOpportunityActivityForm')}`;

        const desc = sanitizeHtml(AutoForm.getFieldValue('notes', 'insertOpportunityActivityForm'), {
          allowedTags: [],
          allowedAttibutes: []
        });

        Tasks.insert({
          title: taskTitle,
          description: desc,
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: setReminder,
          reminder: (setReminder ? reminder : null),
          entityType: 'opportunity',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertOpportunityActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error(`An error occurred whilst creating a task from this activity: ${err}`);
        });
      }
    }
  }
});

Template.insertOpportunityActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertTaskActivityModal.helpers({
  currentEntity: function() {
    return this.task.entityType;
  },
  currentEntityId: function() {
    return this.task.entityId;
  },
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertJobActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Job activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertOpportunityActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Opportunity activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertTaskActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Task activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  }
});
