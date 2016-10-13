import '/imports/ui/components/autosuggest/autosuggest.js';
import './insert-task-modal.html';
import './reminder-selector.js';

Template.insertNewTask.onCreated(function() {
  this.showRemindMe = new ReactiveVar(false);
  this.hasDueDate = new ReactiveVar(false);
});

Template.insertNewTask.onRendered(function() {
  if (this.data.dueDate) {
    $('#taskDueDate').data("DateTimePicker").date(moment(this.data.dueDate).toDate());
  }
});

Template.insertNewTask.helpers({
  parentTask: function() {
    return this._id;
  },
  hasDueDate: function() {
    return Template.instance().hasDueDate.get();
  },
  showRemindMe: function() {
    return Template.instance().showRemindMe.get();
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
      case 'job':
        Meteor.subscribe('allJobs');
        searchIndex = JobsIndex;
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
