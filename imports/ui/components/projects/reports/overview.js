import './overview.html';

const setValues = (template) => {
  Meteor.call('report.numberOfProjects', (err, data) => {
    template.totalProjects.set(data);
  });
  Meteor.call('report.activeProjects', (err, data) => {
    template.activeProjects.set(data);
  });
  Meteor.call('report.projectValue', (err, data) => {
    template.projectTotal.set(data);
  });
  Meteor.call('report.projectsAverage', (err, data) => {
    template.projectsAverage.set(data);
  });
};

Template.projectsOverview.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);
});

Template.projectsOverview.onRendered(function() {
  setValues(this);
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
    setValues(template);
  }
});
