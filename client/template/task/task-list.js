Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });

  // Search props
  this.showCompleted = new ReactiveVar(false);
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
  // Update search props if reactive vars changed
  this.autorun( () => {
    var searchComponent = TasksIndex.getComponentMethods();
    if (this.showCompleted.get()) {
      searchComponent.addProps('showCompleted', 'true');
    } else {
      searchComponent.removeProps('showCompleted');
    }
  });
});

Template.taskList.helpers({
  showComp: function() {
    return Template.instance().showCompleted.get();
  }
});

Template.taskList.events({
  'click #tskToggleCompleted': function(event) {
    event.preventDefault();
    var showCompleted = Template.instance().showCompleted.get();
    Template.instance().showCompleted.set(!showCompleted);
    $(event.target).blur();
  },
  'click #tskDeleteAllCompleted': function(event) {
    event.preventDefault();
    var searchDefinition = TasksIndex.getComponentDict().get('searchDefinition');
    var searchOptions = TasksIndex.getComponentDict().get('searchOptions');
    $(event.target).blur();
    bootbox.confirm('Are you sure you want to delete these tasks?', (res) => {
      if(res === true) {
        Meteor.call('deleteCompletedTasks', searchDefinition, searchOptions, (err, res) => {
          if(err) {
            toastr.error('Unable to delete tasks');
          } else {
            toastr.success('The tasks have successfully been deleted.');
            TasksIndex.getComponentMethods().search(searchDefinition);
          }
        });
      }
    });
  },
  'click .add-task': function(e) {
    var entityType = $(e.target).attr('id');
    Modal.show('insertNewTask', {
      entity_type: entityType
    })
  }
});
