import '../task-item.js';
import '../modals/insert-task-modal.js';
import './subtask-list.html';
import { Tasks } from '/imports/api/collections.js';

Template.subtaskList.onCreated(function() {
  this.subscribe('subTasksByTaskId', Template.currentData()._id);
});

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
    return Tasks.find({ parentTaskId: Template.currentData()._id });
  }
});
