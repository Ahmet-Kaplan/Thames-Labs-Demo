Template.projectsList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });
  this.showArchived = new ReactiveVar(false);
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);
});

Template.projectsList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('projectListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('projectListSearchQuery');
    if (searchQuery) {
      ProjectsIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });

  // Update search props if reactive vars changed
  this.autorun( () => {
    var searchComponent = ProjectsIndex.getComponentMethods();
    if (this.showArchived.get()) {
      searchComponent.addProps('showArchived', 'true');
    } else {
      searchComponent.removeProps('showArchived');
    }
  });

  var template = this;

  Meteor.call('report.numberOfProjects', function(err, data) {
    template.totalProjects.set(data.Count);
  });
  Meteor.call('report.activeProjects', function(err, data) {
    template.activeProjects.set(data.Count);
  });
  Meteor.call('report.projectValue', function(err, data) {
    template.projectTotal.set(data.Value);
  });
  Meteor.call('report.projectsAverage', function(err, data) {
    template.projectsAverage.set(data.Value);
  });

  $('[data-toggle="popover"]').popover({html: true, placement: "bottom", container: '#btn-popover'});
});

Template.projectsList.events({
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newProjectForm', this);
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('projects');
  },
  'click #ref_projectOverviewWidget': function(event, template) {

    Meteor.call('report.numberOfProjects', function(err, data) {
      template.totalProjects.set(data.Count);
    });
    Meteor.call('report.activeProjects', function(err, data) {
      template.activeProjects.set(data.Count);
    });
    Meteor.call('report.projectValue', function(err, data) {
      template.projectTotal.set(data.Value);
    });
    Meteor.call('report.projectsAverage', function(err, data) {
      template.projectsAverage.set(data.Value);
    });
  },
  'click #toggle-archived': function(event) {
    event.preventDefault();
    var showArchived = Template.instance().showArchived.get();
    Template.instance().showArchived.set(!showArchived);
    $(event.target).blur();
  }
});

Template.projectsList.helpers({
  archivedShown: function() {
    return Template.instance().showArchived.get();
  },
  totalProjects: function() {
    return Template.instance().totalProjects.get();
  },
  activeProjects: function() {
    return Template.instance().activeProjects.get();
  },
  projectTotal: function() {
    return Template.instance().projectTotal.get();
  },
  projectsAverage: function() {
    return Template.instance().projectsAverage.get();
  }
});
