var jobsList = JobCollection('jobsQueue');


Job.processJobs('jobsQueue', 'sendReminderEmail', function(job, callback) {
  var assigneeId = job.data.assigneeId;

  if(assigneeId === undefined) {
    job.log('Unable to find user with _id: ' + job.data.assigneeId, {level: 'warning'});
    job.fail('User not found.');
    callback;
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
      from: 'admin@realtimecrm.co.uk',
      subject: 'Task reminder - ' + task.title,
      text: text
    });

    job.done();
    job.remove();
    Tasks.direct.update(job.data.taskId, {
      $unset: {
        taskReminderJob: ''
      }
    })
    callback();
  });
});

Meteor.startup(function() {
  jobsList.startJobServer();
});

Meteor.methods({
  addTaskReminder: function(taskId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanCreateTasks'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to create Tasks');
    }

    var task = Tasks.findOne({_id: taskId});

    //Checking task exist
    if(!task) {
      throw new Meteor.Error(404, 'No task provided.');
    }

    //Checking validity of dates provided
    var reminderDate = moment(task.reminder);
    var dueDate = moment(task.dueDate);

    if(reminderDate.isBefore(moment())){
      throw new Meteor.Error(400, 'The reminder date is in the past.');
    } else if(task.dueDate && reminderDate.isAfter(dueDate)) {
      throw new Meteor.error(400, 'The reminder date is after the due Date.');
    }

    //create job
    else if(task.remindMe && task.reminder) {
      var taskJob = new Job(jobsList, 'sendReminderEmail', {
        assigneeId: task.assigneeId,
        taskId: taskId
      });
      taskJob.priority('normal')
             .after(task.reminder)
             .save();

      Tasks.direct.update(task._id, {
        $set: {
          taskReminderJob: taskJob._doc._id
        }
      })
    }
  },

  editTaskReminder: function(taskId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanEditTasks'])) {
      throw new Meteor.Error(403, 'You do not have the permissions to edit Tasks');
    }

    var task = Tasks.findOne({_id: taskId});

    //Checking task exist
    if(!task) {
      throw new Meteor.Error(404, 'No task provided.');
    }

    var reminderDate = moment(task.reminder);
    var dueDate = moment(task.dueDate);
    var taskJob;

    //If reminder job exist, update or cancel it
    if(task.taskReminderJob) {

      taskJob = jobsList.getJob(task.taskReminderJob);

      //Update
      if(task.remindMe && task.reminder) {
        //Check date validity
        if(reminderDate.isBefore(moment())){
          throw new Meteor.Error(400, 'The reminder date is in the past.');
        } else if(task.dueDate && reminderDate.isAfter(dueDate)) {
          throw new Meteor.error(400, 'The reminder date is after the due Date.');
        }

        //Check if task can be paused
        if( taskJob._doc.status === 'ready' || taskJob._doc.status === 'waiting') {
          taskJob.pause();
          taskJob.after(task.reminder);
          taskJob.save();

        //Else it means we have to create a new job
        //Because the job ran and is now deleted  
        } else {
          Meteor.call('addTaskReminder', taskId)
        }

      //Delete
      } else {
        taskJob.remove(function(err, result) {
          if(err) {
            throw new Meteor.Error('JobError', 'Unable to cancel job')
          } else {
            Tasks.update(taskId, {
              $unset: {
                taskReminderJob: ''
              }
            })
          }
        });
      }

    //If no job set, check if need to create one
    } else if(task.remindMe && task.reminder) {
      Meteor.call('addTaskReminder', taskId);
    }
  },

  deleteTaskReminder: function(jobId) {
    //Checking permission
    if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanDeleteTasks'])) {
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
  }
})