Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });

  // Store search index dict on template to allow helpers to access
  this.index = TasksIndex;

  // Calendar toggle
  this.showCalendar = new ReactiveVar(false);

  this.showMine = new ReactiveVar(false);

  // Total tasks in search results
  this.totalTasks = new ReactiveVar(0);
});

Template.taskList.onRendered(function() {

  // Watch for session variable setting search
  Session.set('taskSearchQuery', null);
  this.autorun(function() {
    var searchQuery = Session.get('taskSearchQuery');
    if (searchQuery) {
      TasksIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });

  this.autorun(() => {
    this.totalTasks.set(Collections['tasks'].index.getComponentDict().get('count'));
  });

  this.autorun(() => {
    const searchComponent = this.index.getComponentDict(),
          searchOptions = searchComponent.get('searchOptions'),
          props = searchOptions.props ? searchOptions.props : {};

    this.showMine.set(props.assignee && props.assignee === Meteor.userId());
  });

  if(!_.get(Collections['tasks'].index.getComponentDict().get('searchOptions').props, "completed")) {
    Collections['tasks'].index.getComponentMethods().addProps('completed', 'No');
  }
});

Template.taskList.helpers({
  showCalendar: function() {
    return Template.instance().showCalendar.get();
  },
  taskCount: function() {
    return Template.instance().totalTasks.get();
  },
  hasMultipleTasks: function() {
    return Template.instance().totalTasks.get() !== 1;
  },
  showMine: function() {
    return Template.instance().showMine.get();
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
    Modal.show('insertNewTask', { entity_data: {
      entity_type: entityType
    }});
  },
  'click #toggle-my-tasks': function(event) {
    event.preventDefault();
    const indexMethods = Template.instance().index.getComponentMethods();
    indexMethods.removeProps('assignee');
    if (!Template.instance().showMine.get()) {
      indexMethods.addProps('assignee', Meteor.userId());
    }
    $(event.target).blur();
  }
});
