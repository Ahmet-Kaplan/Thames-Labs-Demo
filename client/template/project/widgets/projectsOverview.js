Template.projectOverviewWidget.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.activeProjectTotal = new ReactiveVar(0);
  this.activeProjectsAverage = new ReactiveVar(0);
});

Template.projectOverviewWidget.onRendered(function() {
  var template = this;

  Meteor.call('report.numberOfProjects', function(err, data) {
    template.totalProjects.set(data.Count);
  });
  Meteor.call('report.activeProjects', function(err, data) {
    template.activeProjects.set(data.Count);
  });
  Meteor.call('report.activeProjectsValue', function(err, data) {
    template.activeProjectTotal.set(data.Count);
  });
  Meteor.call('report.activeProjects', function(err, data) {
    template.activeProjectsAverage.set(data.Count);
  });
});

Template.projectOverviewWidget.events({
  'click #ref_projectOverviewWidget': function(event, template) {

    Meteor.call('report.numberOfProjects', function(err, data) {
      template.totalProjects.set(data.Count);
    });
    Meteor.call('report.activeProjects', function(err, data) {
      template.activeProjects.set(data.Count);
    });
    Meteor.call('report.activeProjectsValue', function(err, data) {
      template.activeProjectTotal.set(data.Value);
    });
    Meteor.call('report.activeProjects', function(err, data) {
      template.activeProjectsAverage.set(data.Value);
    });
  }
});

Template.projectOverviewWidget.helpers({
  totalProjects: function() {
    return Template.instance().totalProjects.get();
  },
  activeProjects: function() {
    return Template.instance().activeProjects.get();
  },
  activeProjectTotal: function() {
    return Template.instance().activeProjectTotal.get();
  },
  activeProjectsAverage: function() {
    return Template.instance().activeProjectsAverage.get();
  }
});
