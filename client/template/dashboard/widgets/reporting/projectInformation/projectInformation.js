Template.projectInformationWidget.onCreated(function() {
  this.totalProjects = new ReactiveVar(0);
  this.activeProjects = new ReactiveVar(0);
  this.activeProjectTotal = new ReactiveVar(0);
  this.activeProjectsAverage = new ReactiveVar(0);
});

Template.projectInformationWidget.onRendered(function() {
  var template = this;

  Meteor.call('rptNumberOfProjects', function(err, data) {
    template.totalProjects.set(data.Count);
  });
  Meteor.call('rptActiveProjects', function(err, data) {
    template.activeProjects.set(data.Count);
  });
  Meteor.call('rptActiveProjectsValue', function(err, data) {
    template.activeProjectTotal.set(data.Count);
  });
  Meteor.call('rptAverageActiveProjectValue', function(err, data) {
    template.activeProjectsAverage.set(data.Count);
  });
});

Template.projectInformationWidget.events({
  'click #ref_projectInformationWidget': function(event, template) {

    Meteor.call('rptNumberOfProjects', function(err, data) {
      template.totalProjects.set(data.Count);
    });
    Meteor.call('rptActiveProjects', function(err, data) {
      template.activeProjects.set(data.Count);
    });
    Meteor.call('rptActiveProjectsValue', function(err, data) {
      template.activeProjectTotal.set(data.Value);
    });
    Meteor.call('rptAverageActiveProjectValue', function(err, data) {
      template.activeProjectsAverage.set(data.Value);
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
  activeProjectTotal: function() {
    return Template.instance().activeProjectTotal.get();
  },
  activeProjectsAverage: function() {
    return Template.instance().activeProjectsAverage.get();
  }
});
