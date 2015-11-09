Template.taskInformationWidget.onCreated(function() {
  this.createdTaskCount = new ReactiveVar(0);
  this.completedTaskCount = new ReactiveVar(0);
  this.dueTaskCount = new ReactiveVar(0);
  this.overdueTaskCount = new ReactiveVar(0);
});

Template.taskInformationWidget.onRendered(function() {
  var template = this;

  Meteor.call('report.tasksCreated', function(err, data) {
    template.createdTaskCount.set(data.Count);
  });
  Meteor.call('report.tasksCompleted', function(err, data) {
    template.completedTaskCount.set(data.Count);
  });
  Meteor.call('report.tasksDueInTheNextWeek', function(err, data) {
    template.dueTaskCount.set(data.Count);
  });
  Meteor.call('report.tasksOverdue', function(err, data) {
    template.overdueTaskCount.set(data.Count);
  });
});

Template.taskInformationWidget.events({
  'click #ref_taskInformationWidget': function(event, template) {
    Meteor.call('report.tasksCreated', function(err, data) {
      template.createdTaskCount.set(data.Count);
    });
    Meteor.call('report.tasksCompleted', function(err, data) {
      template.completedTaskCount.set(data.Count);
    });
    Meteor.call('report.tasksDueInTheNextWeek', function(err, data) {
      template.dueTaskCount.set(data.Count);
    });
    Meteor.call('report.tasksOverdue', function(err, data) {
      template.overdueTaskCount.set(data.Count);
    });
  }
});

Template.taskInformationWidget.helpers({
  createdTasks: function() {
    return Template.instance().createdTaskCount.get();
  },
  completedTasks: function() {
    return Template.instance().completedTaskCount.get();
  },
  dueTasks: function() {
    return Template.instance().dueTaskCount.get();
  },
  overdueTasks: function() {
    return Template.instance().overdueTaskCount.get();
  }
});
