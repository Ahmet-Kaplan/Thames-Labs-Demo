Template.projectInformationWidget.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);
});

Template.projectInformationWidget.onRendered(function() {
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
});

Template.projectInformationWidget.events({
  'click #ref_projectInformationWidget': function(event, template) {

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
  }
});

Template.projectInformationWidget.helpers({
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
