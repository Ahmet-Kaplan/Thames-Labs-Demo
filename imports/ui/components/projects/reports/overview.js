import './overview.html';

Template.projectsOverview.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);
});

Template.projectsOverview.onRendered(function() {

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
});

Template.projectsOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
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
