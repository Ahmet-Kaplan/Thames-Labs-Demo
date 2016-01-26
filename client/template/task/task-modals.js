Template.insertNewTask.onRendered(function() {
  Session.set('showRemindMe', false);
  Session.set('hasDueDate', false);
});

Template.insertNewTask.helpers({
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
    return (this.entity_type === "user" ? true : false);
  },
  getCurrentUserId: function() {
    return Meteor.userId();
  },
  autosuggestIndex: function() {
    var searchIndex;
    switch(this.entity_type) {
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
        Meteor.subscribe('allProjects')
        searchIndex = ProjectsIndex;
        break;
    }
    return searchIndex;
  },
  displayLabel: function() {
    if(this.entity_type === "user") {
      return 'Personal';
    } else {
      return this.entity_type.charAt(0).toUpperCase() + this.entity_type.slice(1);
    }
  },
  dueDateValue: function() {
    //this.dueDate is a momentjs object
    return this.dueDate.toString();
  }
});

Template.insertNewTask.events({
  'change input[name=dueDate]': function(e) {
    e.preventDefault();
    if($('input[name=dueDate]').val()) {
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
  Session.set('hasDueDate', this.data.dueDate !== undefined);
});

Template.updateTask.helpers({
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
    if($('input[name=dueDate]').val()) {
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
  if(this.data.reminder) {
    var reminderValue = this.data.reminder.split('.')[0];
    var reminderUnit = this.data.reminder.split('.')[1];
    $('#reminderValue').val(reminderValue);
    $('#reminderUnit').val(reminderUnit);
  }
});
