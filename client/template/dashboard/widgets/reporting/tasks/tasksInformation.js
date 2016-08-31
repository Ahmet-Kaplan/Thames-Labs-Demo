Template.taskInformationWidget.onCreated(function() {
  this.createdTaskCount = new ReactiveVar(0);
  this.completedTaskCount = new ReactiveVar(0);
  this.dueTaskCount = new ReactiveVar(0);
  this.overdueTaskCount = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.tasksCreated', (err, data) => {
      this.createdTaskCount.set(data);
    });
    Meteor.call('report.tasksCompleted', (err, data) => {
      this.completedTaskCount.set(data);
    });
    Meteor.call('report.tasksDueInTheNextWeek', (err, data) => {
      this.dueTaskCount.set(data);
    });
    Meteor.call('report.tasksOverdue', (err, data) => {
      this.overdueTaskCount.set(data);
    });
  };
});

Template.taskInformationWidget.onRendered(function() {
  this.setValues();
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
