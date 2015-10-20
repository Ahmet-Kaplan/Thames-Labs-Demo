Template.taskWidget.onCreated(function() {
  this.subscribe('allUserTasks', Meteor.userId());
});

Template.taskWidget.helpers({
  getCurrentUserId: function() {
    return Meteor.userId();
  }
});
