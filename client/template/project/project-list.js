Template.projectsList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });
});

Template.projectsList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('projectListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('projectListSearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'projects'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });
});

Template.projectsList.helpers({
  projectCount: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'projects'
    });
    return easySearchInstance.get('total');
  },
  hasMultipleProjects: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'projects'
    });
    return easySearchInstance.get('total') !== 1;
  }
});

Template.projectsList.events({
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newProjectForm', this);
  }
});
