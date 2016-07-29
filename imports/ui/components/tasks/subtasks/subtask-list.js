import './subtask-list.html';

Template.subtaskList.events({
  'click #create-sub-task': function(event, template) {
    event.preventDefault();
    Modal.show('insertNewTask', {
      _id: this._id,
      entity_type: this.entityType,
      entity_id: this.entityId,
      dueDate: (this.dueDate ? this.dueDate : null)
    });
  }
});

Template.subtaskList.helpers({
  subtasks: function() {
    var subs = ReactiveMethod.apply("tasks.getSubTasks", [Template.currentData()._id]);
    if (subs && subs.length > 0) return subs;
  }
});