jobsList = JobCollection('jobsQueue');


Job.processJobs('jobsQueue', 'sendReminderEmail', function(job, callback) {
  var assigneeId = job.data.assigneeId;

  if(typeof assigneeId === "undefined") {
    job.log('Unable to find user with _id: ' + job.data.assigneeId, {level: 'warning'});
    job.fail('User not found.');
    callback();
  } else {
    var assignee = Meteor.users.findOne({_id: assigneeId});
  }

  Partitioner.directOperation(function() {
    var task = Tasks.findOne({_id: job.data.taskId});

    if(!task) {
      job.log("Unable to find task with _id: " + job.data.taskId, {level: 'warning'});
      job.fail('Task not found.');
      callback();
    }

    var text = "Dear " + assignee.profile.name + ",\n\n" +
               "Reminder for the task: " + task.title + "\n" +
               "Description: " + task.description + "\n\n" +
               "The RealTimeCRM team";

    Email.send({
      to: assignee.emails[0].address,
      from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
      subject: 'Task reminder - ' + task.title,
      text: text
    });

    Notifications.insert({
      title: task.title || 'RealtimeCRM Task Reminder',
      shortDescription: 'RealtimeCRM Task Reminder',
      detail: task.description || 'No description provided',
      target: assigneeId,
      createdAt: new Date(),
      createdBy: task.createdBy,
      icon: 'check'
    });

    job.done();
    job.remove();
    Tasks.direct.update(job.data.taskId, {
      $unset: {
        taskReminderJob: ''
      }
    });
    callback();
  });
});

Meteor.startup(function() {
  jobsList.startJobServer();
});

Meteor.methods({
  addTaskReminder: function(taskId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, ['CanCreateTasks'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to create Tasks');
    }

    var task = Tasks.findOne({_id: taskId});

    //Checking task exist
    if(!task) {
      throw new Meteor.Error(404, 'No task provided.');
    }

    //Checking validity of dates provided
    var reminderValue = parseInt(task.reminder.split('.')[0], 10);
    var reminderUnit = task.reminder.split('.')[1];
    var reminderDate = moment(task.dueDate).subtract(reminderValue, reminderUnit);
    var dueDate = moment(task.dueDate);

    if (reminderDate.isBefore(moment())) {
      throw new Meteor.Error(400, 'The reminder date is in the past.');
    } else if(task.dueDate && reminderDate.isAfter(dueDate)) {
      throw new Meteor.Error(400, 'The reminder date is after the due Date.');
    } else if(task.remindMe && task.reminder) {
      //create job
      var taskJob = new Job(jobsList, 'sendReminderEmail', {
        assigneeId: task.assigneeId,
        taskId: taskId
      });

      taskJob.priority('normal')
             .after(reminderDate.toDate())
             .save();

      Tasks.direct.update(task._id, {
        $set: {
          taskReminderJob: taskJob._doc._id
        }
      });
    }
  },

  editTaskReminder: function(taskId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, [ 'CanEditTasks'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to edit Tasks');
    }

    var task = Tasks.findOne({_id: taskId});

    //Checking task exist
    if(!task) {
      throw new Meteor.Error(404, 'No task provided.');
    }

    if(task.completed && task.taskReminderJob) {
      Meteor.call('deleteTaskReminder', task.taskReminderJob, task._id);
      return true;
    }

    //If reminder job exist, update or cancel it
    if(task.taskReminderJob) {

      var reminderValue = parseInt(task.reminder.split('.')[0], 10);
      var reminderUnit = task.reminder.split('.')[1];
      var reminderDate = moment(task.dueDate).subtract(reminderValue, reminderUnit);
      var dueDate = moment(task.dueDate);
      var taskJob;

      taskJob = jobsList.getJob(task.taskReminderJob);

      //Update
      if(task.remindMe && task.reminder) {
        //Check date validity
        if (reminderDate.isBefore(moment())) {
          throw new Meteor.Error(400, 'The reminder date is in the past.');
        } else if(task.dueDate && reminderDate.isAfter(dueDate)) {
          throw new Meteor.Error(400, 'The reminder date is after the due Date.');
        }

        //Check if task can be paused
        if( taskJob._doc.status === 'ready' || taskJob._doc.status === 'waiting') {
          taskJob.pause();
          taskJob.after(reminderDate.toDate());
          taskJob.save();

        //Else it means we have to create a new job
        //Because the job ran and is now deleted
        } else {
          Meteor.call('addTaskReminder', taskId);
        }

      //Delete
      } else {
        Meteor.call('deleteTaskReminder', task.taskReminderJob, task._id);
      }

    //If no job set, check if need to create one
    } else if(task.remindMe && task.reminder) {
      Meteor.call('addTaskReminder', taskId);
    }
  },

  deleteTaskReminder: function(jobId, taskId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, ['CanDeleteTasks'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to remove Tasks');
    }

    //Checking job exist
    if(!jobId) {
      throw new Meteor.Error(404, 'No job provided.');
    }

    var taskJob = jobsList.getJob(jobId);
    var cancellable = ['running', 'ready', 'waiting', 'paused'];
    //Not all status are removable. If not in a right status, cancel it (cancel can be removed)
    if(cancellable.indexOf(taskJob._doc.status, cancellable) !== -1) {
      taskJob.cancel();
    }
    taskJob.remove();

    if(taskId) {
      Partitioner.directOperation(function() {
        Tasks.direct.update(taskId, {
          $unset: {
            taskReminderJob: ''
          }
        });
      });
    }
  },

  getJobsList: function() {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to access this data');
    }

    return jobsList.find({}).fetch();
  }
});
