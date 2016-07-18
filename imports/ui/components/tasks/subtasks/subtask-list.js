import './subtask-list.html';

Template.subtaskList.events({
  'click #create-sub-task': function(event, template) {
    event.preventDefault();
    Modal.show('insertNewTask', {
      _id: this._id,
      entity_type: this.entityType,
      entity_id: this.entityId
    });
  }
});

Template.subtaskList.helpers({
  subtasks: function() {
    var subs = ReactiveMethod.apply("tasks.getSubTasks", [Template.currentData()._id]);
    if (subs && subs.length > 0) return subs;
  }
});

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
