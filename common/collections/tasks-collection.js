import { wordedTimes, getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';

Collections.tasks = Tasks = new Mongo.Collection('tasks');
Partitioner.partitionCollection(Tasks);
Tags.TagsMixin(Tasks);

Tasks.helpers({
  activities: function() {
    var collectionsToFilter = getDisallowedPermissions(Meteor.userId());

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

Collections.tasks.filters = {
  assignee: {
    display: 'Assignee:',
    prop: 'assignee',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    displayValue: function(user) {
      if(user) {
        return user.profile.name;
      }
    }
  },
  company: {
    display: 'Company:',
    prop: 'company',
    collectionName: 'companies',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'companyById',
    displayValue: function(company) {
      if(company) {
        return company.name;
      }
    }
  },
  contact: {
    display: 'Contact:',
    prop: 'contact',
    collectionName: 'contacts',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'contactById',
    displayValue: function(contact) {
      if(contact) {
        return contact.name();
      }
    }
  },
  opportunity: {
    display: 'Opportunity:',
    prop: 'opportunity',
    collectionName: 'opportunities',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'opportunityById',
    displayValue: function(opportunity) {
      if(opportunity) {
        return opportunity.name;
      }
    }
  },
  project: {
    display: 'Project:',
    prop: 'project',
    collectionName: 'projects',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'projectById',
    displayValue: function(project) {
      if(project) {
        return project.name;
      }
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'tasks'
    },
    valueField: 'name',
    nameField: 'name'
  },
  dueDate: {
    display: 'Due Date:',
    prop: 'dueDate',
    verify: function(dueDate) {
      if(!getEuropeanDate(dueDate) && !getWordedTime(dueDate)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove dueBefore/dueAfter if set
      if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.after')) {
        Collections.tasks.index.getComponentMethods().removeProps('after');
      }
      if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.before')) {
        Collections.tasks.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(wordedTimes, 'expr');
    }
  },
  before: {
    display: 'Due Before:',
    prop: 'before',
    verify: function(date) {
      var afterOption = _.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.after', null);
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if(afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error('The \'Before\' date is before the \'After\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  after: {
    display: 'Due After:',
    prop: 'after',
    verify: function(date) {
      var beforeOption = _.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.before', null);
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if(beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error('The \'After\' date is after the \'Before\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  completed: {
    display: 'Completed:',
    prop: 'completed',
    defaultOptions: function() {
      return ['Yes', 'No'];
    },
    strict: true,
    allowMultiple: false,
    verify: function(completed) {
      if (!completed) return false;
      return completed;
    }
  }
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.tasks.index = TasksIndex = new EasySearch.Index({
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

      if(options.search.props.project) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.project.split(',')
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

  if(doc.entityType === "opportunity" && doc.dueDate) {
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
      Opportunities.update({_id: doc.entityId}, {$set: {nextActionDue: nextTask.dueDate}});
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
