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
        var taskDate = moment($('#helperContent .taskdatetimepicker').val()).toDate();

        var taskTitle = "Follow Up " + AutoForm.getFieldValue('type', 'insertActivityForm');
        if (AutoForm.getFieldValue('contactId', 'insertActivityForm')) {
          var contact = Contacts.findOne({
            _id: AutoForm.getFieldValue('contactId', 'insertActivityForm')
          });
          if (contact) {
            taskTitle = taskTitle + " with " + contact.forename + " " + contact.surname;
          }
        }

        Tasks.insert({
          title: taskTitle,
          description: TagStripper.strip(AutoForm.getFieldValue('notes', 'insertActivityForm')),
          dueDate: taskDate,
          assigneeId: Meteor.userId(),
          completed: false,
          remindMe: true,
          reminder: '1.hours',
          entityType: 'company',
          entityId: AutoForm.getFieldValue('primaryEntityId', 'insertActivityForm'),
          createdBy: Meteor.userId()
        }, function(err) {
          console.log(err);
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