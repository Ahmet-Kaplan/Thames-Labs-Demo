Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });

  // Store search index dict on template to allow helpers to access
  this.index = TasksIndex;

  // Calendar toggle
  this.showCalendar = new ReactiveVar(false);

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
  }
});

Template.taskList.events({
  'click #tskToggleCalendar': function(event) {
    event.preventDefault();
    var showCalendar = Template.instance().showCalendar.get();
    Template.instance().showCalendar.set(!showCalendar);
    $(event.target).blur();
  },
  'click .add-task': function(e) {
    e.preventDefault();
    var entityType = e.target.id;
    Modal.show('insertNewTask', {
      entity_type: entityType
    });
  }
});
