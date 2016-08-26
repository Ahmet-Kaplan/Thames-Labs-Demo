import './overview.html';

Template.projectsOverview.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.numberOfProjects', (err, data) => {
      this.totalProjects.set(data);
    });
    Meteor.call('report.activeProjects', (err, data) => {
      this.activeProjects.set(data);
    });
    Meteor.call('report.projectValue', (err, data) => {
      this.projectTotal.set(data);
    });
    Meteor.call('report.projectsAverage', (err, data) => {
      this.projectsAverage.set(data);
    });
  };
});

Template.projectsOverview.onRendered(function() {
  this.setValues();
});

Template.projectsOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
  },
  totalProjects: function() {
    return Template.instance().activeProjects.get();
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

Template.projectsOverview.events({
  'click #ref_projectOverviewWidget': function(event, template) {
    template.setValues();
  }
});
