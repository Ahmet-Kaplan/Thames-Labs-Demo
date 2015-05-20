Template.dashboard.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.dashboard.helpers({
  myCompanies: function() {
    return Companies.find({});
  },
  myContacts: function() {
    return Contacts.find({});
  },
  myProjects: function() {
    return Projects.find({});
  },
  myActivities: function() {
    return Activities.find({});
  }
});
