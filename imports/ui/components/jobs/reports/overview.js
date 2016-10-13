import './overview.html';

Template.jobsOverview.onCreated(function() {
  this.totalJobs = new ReactiveVar(0);
  this.activeJobs = new ReactiveVar(0);
  this.jobTotal = new ReactiveVar(0);
  this.jobsAverage = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.numberOfJobs', (err, data) => {
      this.totalJobs.set(data);
    });
    Meteor.call('report.activeJobs', (err, data) => {
      this.activeJobs.set(data);
    });
    Meteor.call('report.jobValue', (err, data) => {
      this.jobTotal.set(data);
    });
    Meteor.call('report.jobsAverage', (err, data) => {
      this.jobsAverage.set(data);
    });
  };
});

Template.jobsOverview.onRendered(function() {
  this.setValues();
});

Template.jobsOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
  },
  totalJobs: function() {
    return Template.instance().activeJobs.get();
  },
  activeJobs: function() {
    return Template.instance().activeJobs.get();
  },
  jobTotal: function() {
    return Template.instance().jobTotal.get();
  },
  jobsAverage: function() {
    return Template.instance().jobsAverage.get();
  }
});

Template.jobsOverview.events({
  'click #ref_jobOverviewWidget': function(event, template) {
    template.setValues();
  }
});
