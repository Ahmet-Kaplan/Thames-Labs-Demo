Template.projectsList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  // Watch for session variable setting search
  Session.set('projectListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('projectListSearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'projects'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
});


Template.projectsList.helpers({
  hasProjects: function() {
    return Projects.find({}).count() > 0;
  }
});

Template.projectsList.events({
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newProjectForm', this);
  }
});

Template.projectListItem.helpers({
  companyName: function() {
    var project = this;
    var comp = Companies.findOne({
      _id: project.companyId
    });

    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  },
  contactName: function() {
    var project = this;
    var cont = Contacts.findOne({
      _id: project.contactId
    });

    if (cont) {
      return cont.title + " " + cont.forename + " " + cont.surname;
    } else {
      return null;
    }
  }
});
