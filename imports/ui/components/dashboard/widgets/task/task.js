import './task.html';
import '/imports/ui/components/tasks/panel/task-panel.js';

Template.taskWidget.onCreated(function() {
  this.subscribe('allUserTasks', Meteor.userId());
});

Template.taskWidget.helpers({
  getCurrentUserId: function() {
    return Meteor.userId();
  }
});
