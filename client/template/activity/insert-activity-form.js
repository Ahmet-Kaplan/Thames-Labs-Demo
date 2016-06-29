
Template.insertActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});
Template.insertContactActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});
Template.insertProjectActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});
Template.insertPurchaseOrderActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});
Template.insertOpportunityActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});
Template.insertTaskActivityModal.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
});

Template.insertActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        var reminder = $('#reminderValue').val() + '.' + $('#reminderUnit').val();

        var d = $('#helperContent .taskdatetimepicker');
        var dtp = d.data('DateTimePicker');
        var taskDate = dtp.date.toDate();

        var taskTitle = "Follow Up " + AutoForm.getFieldValue('type', 'insertActivityForm');
        if (AutoForm.getFieldValue('contactId', 'insertActivityForm')) {
          var contact = Contacts.findOne({
            _id: AutoForm.getFieldValue('contactId', 'insertActivityForm')
          });
          if (contact) {
            taskTitle = taskTitle + " with " + contact.forename + " " + contact.surname;

            Tasks.insert({
              title: taskTitle,
              description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertActivityForm')),
              dueDate: taskDate,
              assigneeId: Meteor.userId(),
              completed: false,
              remindMe: true,
              reminder: reminder,
              entityType: 'contact',
              entityId: AutoForm.getFieldValue('contactId', 'insertActivityForm'),
              createdBy: Meteor.userId()
            }, function(err) {
              if (err) toastr.error("An error occurred whilst creating a task from this activity: " + err);
            });

            return;
          }
        }

        Tasks.insert({
          title: taskTitle,
          description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertActivityForm')),
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: true,
          reminder: reminder,
          entityType: 'company',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error("An error occurred whilst creating a task from this activity: " + err);
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
        var reminder = $('#reminderValue').val() + '.' + $('#reminderUnit').val();
        var d = $('#helperContent .taskdatetimepicker');
        var dtp = d.data('DateTimePicker');
        var taskDate = dtp.date.toDate();
        var taskTitle = "Follow Up " + AutoForm.getFieldValue('type', 'insertContactActivityForm');

        Tasks.insert({
          title: taskTitle,
          description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertContactActivityForm')),
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: true,
          reminder: reminder,
          entityType: 'contact',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertContactActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error("An error occurred whilst creating a task from this activity: " + err);
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
    return this.contact.forename + " " + this.contact.surname;
  }
});

Template.insertProjectActivityModal.events({
  'click #confirm': function(e, t) {
    if (AutoForm.validateForm('insertProjectActivityForm')) {
      if ($('#create-task-toggle').prop('checked')) {
        var reminder = $('#reminderValue').val() + '.' + $('#reminderUnit').val();
        var d = $('#helperContent .taskdatetimepicker');
        var dtp = d.data('DateTimePicker');
        var taskDate = dtp.date.toDate();

        var taskTitle = "Follow Up " + AutoForm.getFieldValue('type', 'insertProjectActivityForm');

        Tasks.insert({
          title: taskTitle,
          description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertProjectActivityForm')),
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: true,
          reminder: reminder,
          entityType: 'project',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertProjectActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error("An error occurred whilst creating a task from this activity: " + err);
        });
      }
    }
  }
});

Template.insertProjectActivityModal.helpers({
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
        var reminder = $('#reminderValue').val() + '.' + $('#reminderUnit').val();
        var d = $('#helperContent .taskdatetimepicker');
        var dtp = d.data('DateTimePicker');
        var taskDate = dtp.date.toDate();

        var taskTitle = "Follow Up " + AutoForm.getFieldValue('type', 'insertOpportunityActivityForm');

        Tasks.insert({
          title: taskTitle,
          description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertOpportunityActivityForm')),
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: true,
          reminder: reminder,
          entityType: 'opportunity',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertOpportunityActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          if (err) toastr.error("An error occurred whilst creating a task from this activity: " + err);
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
