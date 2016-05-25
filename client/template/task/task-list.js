Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });

  // Store search index dict on template to allow helpers to access
  this.index = TasksIndex;

  // Search props
  this.showCompleted = new ReactiveVar(false);
  // this.showSubTasks = new ReactiveVar(false);
  this.showMine = new ReactiveVar(false);

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

  // Update reactive vars if search props change
  this.autorun(() => {
    const searchComponent = this.index.getComponentDict(),
          searchOptions = searchComponent.get('searchOptions'),
          props = searchOptions.props ? searchOptions.props : {};

    this.showCompleted.set(!!props.showCompleted);
    // this.showSubTasks.set(props.showSubTasks ? true : false);
    this.showMine.set(props.assignee && props.assignee === Meteor.userId());
  });

});

Template.taskList.helpers({
  showComp: function() {
    return Template.instance().showCompleted.get();
  },
  showSubs: function() {
    // return Template.instance().showSubTasks.get();
  },
  showMine: function() {
    return Template.instance().showMine.get();
  },
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
  'click #tskToggleCompleted': function(event) {
    event.preventDefault();
    const indexMethods = Template.instance().index.getComponentMethods();
    if (Template.instance().showCompleted.get()) {
      indexMethods.removeProps('showCompleted');
    } else {
      indexMethods.addProps('showCompleted', 'true');
    }
    $(event.target).blur();
  },
  // 'click #tskToggleSubTasks': function(event) {
  //   event.preventDefault();
  //   const indexMethods = Template.instance().index.getComponentMethods();
  //   if (Template.instance().showSubTasks.get()) {
  //     indexMethods.removeProps('showSubTasks');
  //   } else {
  //     indexMethods.addProps('showSubTasks', 'true');
  //   }
  //   $(event.target).blur();
  // },
  'click #tskToggleCalendar': function(event) {
    event.preventDefault();
    var showCalendar = Template.instance().showCalendar.get();
    Template.instance().showCalendar.set(!showCalendar);
    $(event.target).blur();
  },
  'click #tskToggleMine': function(event) {
    event.preventDefault();
    const indexMethods = Template.instance().index.getComponentMethods();
    indexMethods.removeProps('assignee');
    if (!Template.instance().showMine.get()) {
      indexMethods.addProps('assignee', Meteor.userId());
    }
    $(event.target).blur();
  },
  'click .add-task': function(e) {
    var entityType = $(e.target).attr('id');
    Modal.show('insertNewTask', {
      entity_type: entityType
    });
  }
});
