Template.insertNewTask.onRendered(function() {
  Session.set('showRemindMe', false);
  Session.set('hasDueDate', false);

  if (this.data.dueDate) {
    $('#taskDueDate').data("DateTimePicker").date(moment(this.data.dueDate).toDate());
  }
});

Template.insertNewTask.helpers({
  parentTask: function() {
    return this._id;
  },
  hasDueDate: function() {
    return Session.get('hasDueDate');
  },
  showRemindMe: function() {
    return Session.get('showRemindMe');
  },
  getEntityType: function() {
    return this.entity_type;
  },
  getEntityId: function() {
    return this.entity_id;
  },
  isUserTask: function() {
    return (this.entity_type === "user");
  },
  getCurrentUserId: function() {
    return Meteor.userId();
  },
  autosuggestIndex: function() {
    var searchIndex;
    switch (this.entity_type) {
      case 'company':
        Meteor.subscribe('allCompanies');
        searchIndex = CompaniesIndex;
        break;
      case 'contact':
        Meteor.subscribe('allContacts');
        searchIndex = ContactsIndex;
        break;
      case 'opportunity':
        Meteor.subscribe('allOpportunities');
        searchIndex = OpportunitiesIndex;
        break;
      case 'project':
        Meteor.subscribe('allProjects');
        searchIndex = ProjectsIndex;
        break;
    }
    return searchIndex;
  },
  displayLabel: function() {
    if (this.entity_type === "user") {
      return 'Personal';
    }
    return this.entity_type.charAt(0).toUpperCase() + this.entity_type.slice(1);
  },
  preventNavigateToTask: function() {
    return this.preventNavigateToTask;
  }
});

Template.insertNewTask.events({
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
    var remindMe = $('input[name=remindMe]').prop('checked');
    Session.set('showRemindMe', remindMe);
  }
});

Template.updateTask.onRendered(function() {
  Session.set('showRemindMe', this.data.remindMe);
  Session.set('hasDueDate', typeof this.data.dueDate !== "undefined");
});

Template.updateTask.helpers({
  exclusions: function() {
    var excludes = [];

    excludes.push(this._id);

    var subs = ReactiveMethod.call("tasks.getSubTasks", this._id);
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

Template.updateTask.events({
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
    var remindMe = $('input[name=remindMe]').prop('checked');
    Session.set('showRemindMe', remindMe);
  }
});

Template.reminderSelector.onRendered(function() {
  if (this.data.reminder) {
    var reminderValue = this.data.reminder.split('.')[0];
    var reminderUnit = this.data.reminder.split('.')[1];
    $('#reminderValue').val(reminderValue);
    $('#reminderUnit').val(reminderUnit);
  }
});