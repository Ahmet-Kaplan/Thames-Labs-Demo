Template.insertNewTask.helpers({
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
  }
});

Template.insertNewTask.events({
  'change input[name=remindMe]': function(e) {
    e.preventDefault();
    var remindMe = $('input[name=remindMe]').prop('checked');
    if(remindMe) {
      $('#showRemindMeDate').show();
    } else {
      $('#showRemindMeDate').hide();
    }
  }
});

Template.updateTask.helpers({
  remindMe: function() {
    return this.remindMe === true;
  }
})

Template.updateTask.events({
  'change input[name=remindMe]': function(e) {
    e.preventDefault();
    var remindMe = $('input[name=remindMe]').prop('checked');
    if(remindMe) {
      $('#showRemindMeDate').show();
    } else {
      $('#showRemindMeDate').hide();
    }
  }
});