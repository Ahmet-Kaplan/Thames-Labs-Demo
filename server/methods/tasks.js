import Future from 'fibers/future';
Meteor.methods({
  "tasks.getSubTasks": function(taskId) {
    return Tasks.find({
      parentTaskId: taskId
    }).fetch();
  },
  "tasks.import": function(taskList) {
    var userId = this.userId;

    var status = {
      exitCode: 0,
      message: 'OK',
      errorData: []
    };

    _.each(taskList, function(task) {
      var objectRecord = null;

      var assigneeId = Meteor.users.findOne({
        "profile.name": task.assignee
      })._id;
      if (!assigneeId) {
        status.exitCode = 1;
        status.message = "Task import failure";
        status.errorData.push('An ID for assignee ' + task.assignee + ' could not be found. Please ensure that the user exists, and that your spelling is correct, and then try again.');
      }

      switch (task.recordType) {
        case 'company':
          objectRecord = Companies.findOne({
            name: task.record
          });
          if (!objectRecord) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('A company with the name ' + task.record + ' could not be found. Please ensure that the company exists, and that your spelling is correct, and then try again.');
          }
          break;
        case 'contact':
          var names = task.record.split(" ");

          objectRecord = Contacts.findOne({
            forename: names[0],
            surname: names[1]
          });
          if (!objectRecord) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('A contact with the name ' + task.record + ' could not be found. Please ensure that the contact exists, and that your spelling is correct, and then try again.');
          }

          break;
        case 'opportunity':
          objectRecord = Opportunities.findOne({
            name: task.record
          });

          if (!objectRecord) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('An opportunity with the name ' + task.record + ' could not be found. Please ensure that the opportunity exists, and that your spelling is correct, and then try again.');
          }
          break;
        case 'project':
          objectRecord = Projects.findOne({
            name: task.record
          });

          if (!objectRecord) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('A project with the name ' + task.record + ' could not be found. Please ensure that the project  exists, and that your spelling is correct, and then try again.');
          }
          break;
        case 'user':
          objectRecord = Meteor.users.findOne({
            "profile.name": task.record
          });
          if (!objectRecord) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('An user with the name ' + task.record + ' could not be found. Please ensure that the user exists, and that your spelling is correct, and then try again.');
          }
          break;
      }

      if (objectRecord) {
        var id = Tasks.insert({
          title: task.title,
          description: task.description,
          dueDate: new Date(task.dueDate),
          assigneeId: assigneeId,
          completed: false,
          entityType: task.recordType,
          entityId: objectRecord._id,
          createdBy: userId
        }, function(err, doc) {
          if (err) {
            status.exitCode = 1;
            status.message = "Task import failure";
            status.errorData.push('Task insert error (' + task.record + '): ' + err);
          }
        });

        if (id) {
          _.each(task.tags.split(','), function(tag) {
            Tasks.addTag(tag, {
              _id: id
            });
          });
        }
      }
    });

    return status;
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