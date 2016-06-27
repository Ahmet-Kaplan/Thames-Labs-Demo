import Future from 'fibers/future';
Meteor.methods({
  "tasks.getSubTasks": function(taskId) {
    return Tasks.find({
      parentTaskId: taskId
    }).fetch();
  },
  'tasks.updateDueDate': function(taskId, newDate) {
    if (!Roles.userIsInRole(this.userId, ['CanEditTasks'])) {
      throw new Meteor.Error(403, 'You do not have the authorization to edit tasks');
    }
    var status = new Future();
    var setDueDate = moment(newDate).toDate();

    taskUpdated = Tasks.update(taskId, {
      $set: {
        dueDate: setDueDate
      }
    }, function(err, res) {
      status.return(res);
    });

    return status.wait();
  }

});