Template.projectsList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });

  // Store search index dict on template to allow helpers to access
  this.index = ProjectsIndex;

  // Summary stats
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);

  this.totalProjects = new ReactiveVar(0);
});

Template.projectsList.onRendered(function() {
  this.autorun(() => {
    this.totalProjects.set(Collections['projects'].index.getComponentDict().get('count'));
  });

  // Watch for session variable setting search
  Session.set('projectListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('projectListSearchQuery');
    if (searchQuery) {
      ProjectsIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });

  Meteor.call('report.numberOfProjects', (err, data) => {
    this.totalProjects.set(data.Count);
  });
  Meteor.call('report.activeProjects', (err, data) => {
    this.activeProjects.set(data.Count);
  });
  Meteor.call('report.projectValue', (err, data) => {
    this.projectTotal.set(data.Value);
  });
  Meteor.call('report.projectsAverage', (err, data) => {
    this.projectsAverage.set(data.Value);
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });

  if(!_.get(Collections['projects'].index.getComponentDict().get('searchOptions').props, "active")) {
    Collections['projects'].index.getComponentMethods().addProps('active', 'Yes');
  }
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
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('newProjectForm', this);
  }
});

Template.projectsList.helpers({
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
  },
  projectCount: function() {
    return Template.instance().totalProjects.get();
  },
  hasMultipleProjects: function() {
    return Template.instance().totalProjects.get() !== 1;
  }
});
