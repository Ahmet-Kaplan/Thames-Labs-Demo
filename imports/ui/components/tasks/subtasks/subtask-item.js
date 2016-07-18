import './subtask-item.html';

Template.subtaskItem.onCreated(function() {
  this.subscribe('taskById', this.data._id);
  this.state = new ReactiveVar(this.data.completed);
});

Template.subtaskItem.onRendered(function() {
  var myId = this.data._id;

  this.autorun(function() {
    var subtask = Tasks.findOne({
      _id: myId
    });
    if (subtask) {
      Template.instance().state.set(subtask.completed);
    }
  });
});

Template.subtaskItem.helpers({
  subtaskCompleted: function() {
    return Template.instance().state.get();
  },
  subtaskName: function() {
    return this.title;
  }
});
