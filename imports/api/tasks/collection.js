import { Activities, Jobs } from '/imports/api/collections.js';
import { getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';

import { TaskSchema } from './schema.js';
import { TaskFilters } from './filters.js';

export const Tasks = new Mongo.Collection('tasks');
Tasks.attachSchema(TaskSchema);

Partitioner.partitionCollection(Tasks);
Tags.TagsMixin(Tasks);

Tasks.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateTasks').apply();
Tasks.permit(['update']).ifLoggedIn().ifHasRole('CanEditTasks').apply();
Tasks.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteTasks').apply();
Tasks.allowTags(function(userId) {
  return !!userId;
});

Tasks.helpers({
  activities: function() {
    const collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      taskId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
});

////////////////////
// SEARCH FILTERS //
////////////////////

Tasks.filters = TaskFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Tasks.index = TasksIndex = new EasySearch.Index({
  collection: Tasks,
  fields: ['title'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadTasks']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({
      'dueDate': 1
    }),
    fields: (searchObject, options) => ({
      'title': 1,
      'description': 1,
      'dueDate': 1,
      'isAllDay': 1,
      'reminder': 1,
      'completed': 1,
      'entityType': 1,
      'entityId': 1,
      'assigneeId': 1,
      'tags': 1,
      'parentTaskId': 1
    }),
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if(options.search.props.assignee) {
        // n.b. the array is passed as a comma separated string
        selector.assigneeId = {
          $in: options.search.props.assignee.split(',')
        };
      }

      if(options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.company.split(',')
        };
      }

      if(options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.contact.split(',')
        };
      }

      if(options.search.props.opportunity) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.opportunity.split(',')
        };
      }

      if(options.search.props.job) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.job.split(',')
        };
      }

      if(options.search.props.excludes) {
        selector._id = {
          $nin: options.search.props.excludes.split(',')
        };
      }

      if(options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.completed) {
        if(options.search.props.completed === "Yes") {
          selector.completed = true;
        } else {
          selector.completed = {
            $ne: true
          };
        }
      }
      if(options.search.props.dueDate) {
        const dueDate = options.search.props.dueDate;
        const europeanDueDate = getEuropeanDate(dueDate);
        const wordedDate = getWordedTime(dueDate);
        let formattedStartDate = null;
        let formattedEndDate = null;

        if(europeanDueDate) {
          formattedStartDate = moment(europeanDueDate).startOf('day').toDate();
          formattedEndDate = moment(europeanDueDate).endOf('day').toDate();
        } else if(wordedDate) {
          formattedStartDate = wordedDate.start.toDate();
          formattedEndDate = wordedDate.end.toDate();
        }

        if(formattedStartDate && formattedEndDate) {
          selector.dueDate = {
            $gte: formattedStartDate,
            $lte: formattedEndDate,
            $ne: null
          };
        }

      }

      if(options.search.props.after || options.search.props.before) {
        const dueAfter = options.search.props.after;
        const dueAfterMoment = getEuropeanDate(dueAfter);
        const dueBefore = options.search.props.before;
        const dueBeforeMoment = getEuropeanDate(dueBefore);
        let startDate = null;
        let endDate = null;
        selector.dueDate = {
          $ne: null
        };

        if(dueAfter && dueAfterMoment) {
          startDate = moment(dueAfterMoment).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        }

        if(dueBefore && dueBeforeMoment) {
          endDate = moment(dueBeforeMoment).endOf('day').toDate();
          selector.dueDate.$lte = endDate;
        }
      }

      if(options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      if (options.search.props.subtasks) {
        if(options.search.props.subtasks === "Hidden") {
          selector.parentTaskId = {
            $exists: false
          };
        }
      }

      return selector;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Tasks.after.insert(function(userId, doc) {
  if(Roles.userIsInRole(userId, ['superadmin'])) return;
  if(doc.remindMe && doc.reminder && Meteor.isServer) {
    Meteor.call('addTaskReminder', doc._id);
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if(user) {
    LogClientEvent(LogLevel.Info, `${user.profile.name} created a new task`, 'task', doc._id);
  }

  if(doc.entityType === "job" && doc.dueDate) {
    const nextTask = Tasks.find({
      entityId: doc.entityId,
      completed: {
        $ne: true
      }
    }, {
      sort: {
        dueDate: 1,
      },
      limit: 1
    }).fetch()[0];

    if (Meteor.isServer) {
      Jobs.update({_id: doc.entityId}, {$set: {nextActionDue: nextTask.dueDate}});
    }
  }
});

Tasks.after.update(function(userId, doc, fieldNames, modifier, options) {
  if(Roles.userIsInRole(userId, ['superadmin'])) return;
  if(Meteor.isServer) {
    Meteor.call('editTaskReminder', doc._id);
  }
  var user = Meteor.users.findOne({
    _id: userId
  });

  if(user) {
    if(doc.title !== this.previous.title) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a task's title`, 'task', doc._id);
    }
    if(doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a task's description`, 'task', doc._id);
    }
    if(doc.dueDate !== this.previous.dueDate) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a task's due date`, 'task', doc._id);
    }
    if(doc.completed !== this.previous.completed) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a task's completed status`, 'task', doc._id);

    }
    if(doc.assigneeId !== this.previous.assigneeId) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a task's assigned user`, 'task', doc._id);
    }
  }

  if(doc.entityType === "job" && doc.dueDate) {
    const nextTask = Tasks.find({
      entityId: doc.entityId,
      completed: {
        $ne: true
      }
    }, {
      sort: {
        dueDate: 1,
      },
      limit: 1
    }).fetch()[0];

    if (Meteor.isServer) {
      Jobs.update({_id: doc.entityId}, {$set: {nextActionDue: nextTask.dueDate}});
    }
  }
});

Tasks.after.remove(function(userId, doc) {
  if(Roles.userIsInRole(userId, ['superadmin'])) return;
  if(ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  if(doc.taskReminderJob && Meteor.isServer) {
    Meteor.call('deleteTaskReminder', doc.taskReminderJob);
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if(user) {
    LogClientEvent(LogLevel.Info, `${user.profile.name} deleted task '${doc.title}'`, 'task', doc._id);
  }

  var subTasks = Tasks.find({
    parentTaskId: doc._id
  }).fetch();

  _.each(subTasks, function(st) {
    Tasks.update({
      _id: st._id
    }, {
      $unset: {
        'parentTaskId': ''
      }
    });
  });
});
