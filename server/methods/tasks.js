Meteor.methods({
  deleteCompletedTasks: function(searchDefinition, searchOptions) {
    if(!Roles.userIsInRole(this.userId, [ 'CanDeleteTasks'])) {
      throw new Meteor.Error(403, 'You do not have the authorization to delete tasks');
    }
    searchOptions.limit = 99999;
    var tasksArray = TasksIndex.search(searchDefinition, searchOptions).fetch();
    _.each(tasksArray, function(task) {
      Tasks.remove(task._id);
    });
  }
})
