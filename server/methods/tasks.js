var Future = Npm.require('fibers/future');
Meteor.methods({
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
  "tasks.export": function(searchDefinition, searchOptions) {
    var returnData = [];

    if (!Collections['tasks'] || !Collections['tasks'].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }
    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    var index = Collections['tasks'].index;
    var result = index.search(searchDefinition, searchOptions).fetch();
    // return result;

    _.each(result, function(res) {
      var assignee = 'Not assigned',
        entityDescriptor = '',
        taskDate = '';
      if (res.assigneeId) {
        assignee = Meteor.users.findOne({
          _id: res.assigneeId
        }).profile.name;
      }
      if (res.dueDate) {
        taskDate = moment(res.dueDate).format('MMMM Do YYYY, h:mm:ss a');
      }

      switch (res.entityType) {
        case 'company':
          entityDescriptor = Companies.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'contact':
          var contact = Contacts.findOne({
            _id: res.entityId
          });
          entityDescriptor = contact.forename + " " + contact.surname;
          break;
        case 'opportunity':
          entityDescriptor = Opportunities.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'project':
          entityDescriptor = Projects.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'user':
          entityDescriptor = Meteor.users.findOne({
            _id: res.entityId
          }).profile.name;
          break;
      }

      var entity = {
        title: res.title,
        description: res.description,
        assignee: assignee,
        dueDate: taskDate,
        record: entityDescriptor,
        recordType: res.entityType,
        completed: (res.completed === true ? 'Yes' : 'No')
      };
      returnData.push(entity);
    });

    return returnData;
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