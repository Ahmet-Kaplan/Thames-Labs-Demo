import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/tasks/task-item.js';
import '/imports/ui/components/tasks/calendar/calendar.js';
import '/imports/ui/components/tasks/modals/insert-task-modal.js';
import '/imports/ui/components/export/export.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';

import './task-list.html';

Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });

  // Store search index dict on template to allow helpers to access
  this.index = TasksIndex;

  // Calendar toggle
  this.showCalendar = new ReactiveVar(false);

  this.showMine = new ReactiveVar(false);

  this.showSubtasks = new ReactiveVar(true);

});

Template.taskList.onRendered(function() {

  this.autorun(() => {
    const searchComponent = this.index.getComponentDict(),
          searchOptions = searchComponent.get('searchOptions'),
          props = searchOptions.props ? searchOptions.props : {};

    this.showMine.set(props.assignee && props.assignee === Meteor.userId());
    if (props.subtasks && props.subtasks === "Hidden") {
      this.showSubtasks.set(false);
    } else {
      this.showSubtasks.set(true);
    }
  });

  if(!_.get(Collections['tasks'].index.getComponentDict().get('searchOptions').props, "completed")) {
    Collections['tasks'].index.getComponentMethods().addProps('completed', 'No');
  }
});

Template.taskList.helpers({
  showCalendar: function() {
    return Template.instance().showCalendar.get();
  },
  showMine: function() {
    return Template.instance().showMine.get();
  },
  showSubtasks: function() {
    return Template.instance().showSubtasks.get();
  },
});

Template.taskList.events({
  'click #tskToggleCalendar': function(event) {
    event.preventDefault();
    const showCalendar = Template.instance().showCalendar.get();
    Template.instance().showCalendar.set(!showCalendar);
    $(event.target).blur();
  },
  'click .add-task': function(event) {
    event.preventDefault();
    const entityType = event.target.id;
    Modal.show('insertNewTask', {
      entity_type: entityType
    });
  },
  'click #toggle-my-tasks': function(event) {
    event.preventDefault();
    const indexMethods = Template.instance().index.getComponentMethods();
    indexMethods.removeProps('assignee');
    if (!Template.instance().showMine.get()) {
      indexMethods.addProps('assignee', Meteor.userId());
    }
    $(event.target).blur();
  },
  'click #tskToggleSubtasks': function(event) {
    event.preventDefault();
    let showSubtasks = Template.instance().showSubtasks.get();
    const indexMethods = Template.instance().index.getComponentMethods();
    showSubtasks = !showSubtasks;
    Template.instance().showSubtasks.set(showSubtasks);
    indexMethods.removeProps('subtasks');
    if (!showSubtasks) {
      indexMethods.addProps('subtasks', "Hidden");
    }
    $(event.target).blur();
  }
});
