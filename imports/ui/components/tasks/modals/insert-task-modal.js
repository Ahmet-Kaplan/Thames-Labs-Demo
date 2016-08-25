import { Opportunities } from '/imports/api/collections.js';
import './insert-task-modal.html';
import './reminder-selector.js';

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
    let searchIndex;
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
    const remindMe = $('input[name=remindMe]').prop('checked');
    Session.set('showRemindMe', remindMe);
  }
});
