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
      if (user) {
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
      if (company) {
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
      if (contact) {
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
      if (opportunity) {
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
      if (project) {
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

      var wordedTimes = Collections.helpers.wordedTimes;
      if (!moment(dueDate).isValid() && !moment(dueDate, 'DD-MM-YYYY', false).isValid() && !_.some(wordedTimes, 'expr', dueDate.toLowerCase())) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove dueDate if set
      if (Collections.tasks.index.getComponentDict().get('searchOptions').props && Collections.tasks.index.getComponentDict().get('searchOptions').props.after) {
        Collections.tasks.index.getComponentMethods().removeProps('after');
      }
      if (Collections.tasks.index.getComponentDict().get('searchOptions').props && Collections.tasks.index.getComponentDict().get('searchOptions').props.before) {
        Collections.tasks.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(Collections.helpers.wordedTimes, function(obj) {
        return obj.expr;
      });
    }
  },
  before: {
    display: 'Due Before:',
    prop: 'before',
    verify: function(date) {
      var afterOption = Collections.tasks.index.getComponentDict().get('searchOptions').props.after;
      if (!moment(date).isValid() && !moment(date, 'DD-MM-YYYY', false).isValid()) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error('The \'Before\' date is before the \'After\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (Collections.tasks.index.getComponentDict().get('searchOptions').props.dueDate) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  after: {
    display: 'Due After:',
    prop: 'after',
    verify: function(date) {
      var beforeOption = Collections.tasks.index.getComponentDict().get('searchOptions').props.before;
      if (!moment(date).isValid() && !moment(date, 'DD-MM-YYYY', false).isValid()) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error('The \'After\' date is after the \'Before\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (Collections.tasks.index.getComponentDict().get('searchOptions').props.dueDate) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
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
    sort: () => ({ 'dueDate': 1 }),
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

      if (options.search.props.assignee) {
        // n.b. the array is passed as a comma separated string
        selector.assigneeId = {
          $in: options.search.props.assignee.split(',')
        };
      }

      if (options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.company.split(',')
        };
      }

      if (options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.contact.split(',')
        };
      }

      if (options.search.props.opportunity) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.opportunity.split(',')
        };
      }

      if (options.search.props.project) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {
          $in: options.search.props.project.split(',')
        };
      }

      if (options.search.props.excludes) {
        selector._id = {
          $nin: options.search.props.excludes.split(',')
        };
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.dueDate) {
        var dueDate = options.search.props.dueDate;
        var wordedTimes = Collections.helpers.wordedTimes;
        var formattedStartDate = null;
        var formattedEndDate = null;

        if (moment(dueDate).isValid()) {
          formattedStartDate = moment(dueDate).startOf('day').toDate();
          formattedEndDate = moment(dueDate).endOf('day').toDate();
        } else if (moment(dueDate, 'DD-MM-YYYY', false).isValid()) {
          formattedStartDate = moment(dueDate, 'DD-MM-YYYY', false).startOf('day').toDate();
          formattedEndDate = moment(dueDate, 'DD-MM-YYYY', false).endOf('day').toDate();
        } else if (_.some(wordedTimes, 'expr', dueDate.toLowerCase())) {
          var index = _.findIndex(wordedTimes, 'expr', dueDate.toLowerCase());
          formattedStartDate = wordedTimes[index].start.toDate();
          formattedEndDate = wordedTimes[index].end.toDate();
        }

        if (formattedStartDate && formattedEndDate) {
          selector.dueDate = {
            $gte: formattedStartDate,
            $lte: formattedEndDate,
            $ne: null
          };
        }

      }

      if (options.search.props.after || options.search.props.before) {
        var dueAfter = options.search.props.after;
        var dueBefore = options.search.props.before;
        var startDate = null;
        var endDate = null;
        selector.dueDate = {
          $ne: null
        };

        if (dueAfter && moment(dueAfter).isValid()) {
          startDate = moment(dueAfter).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        } else if (dueAfter && moment(dueAfter, 'DD-MM-YYYY', false).isValid()) {
          startDate = moment(dueAfter, 'DD-MM-YYYY', false).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        }

        if (dueBefore && moment(dueBefore).isValid()) {
          endDate = moment(dueBefore).endOf('day').toDate();
          selector.dueDate.$lte = endDate;
        } else if (dueBefore && moment(dueBefore, 'DD-MM-YYYY', false).isValid()) {
          endDate = moment(dueBefore, 'DD-MM-YYYY', false).endOf('day').toDate();
          selector.dueDate.$lte = endDate;
        }
      }

      if (options.search.props.showCompleted) {
        selector.completed = true;
      } else {
        selector.completed = {
          $ne: true
        };
      }

      // if (options.search.props.showSubTasks) {
      //   selector.parentTaskId = {
      //     $exists: true
      //   };
      // } else {
      //   selector.parentTaskId = {
      //     $exists: false
      //   };
      // }

      if (options.search.props.searchById) {
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
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (doc.remindMe && doc.reminder && Meteor.isServer) {
    Meteor.call('addTaskReminder', doc._id);
  }

  var entityType;
  var entityId;

  switch (doc.entityType) {
    case 'company':
      entityType = "company";
      entityId = doc.entityId;
      break;
    case 'contact':
      entityType = "contact";
      entityId = doc.entityId;
      break;
    case 'opportunity':
      entityType = "opportunity";
      entityId = doc.entityId;
      break;
    case 'project':
      entityType = "project";
      entityId = doc.entityId;
      break;
    case 'user':
      entityType = "user";
      entityId = doc.entityId;
      break;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new task", entityType, entityId);
  }
});

Tasks.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (Meteor.isServer) {
    Meteor.call('editTaskReminder', doc._id);
  }

  var entityType;
  var entityId;

  switch (doc.entityType) {
    case 'company':
      entityType = "company";
      entityId = doc.entityId;
      break;
    case 'contact':
      entityType = "contact";
      entityId = doc.entityId;
      break;
    case 'opportunity':
      entityType = "opportunity";
      entityId = doc.entityId;
      break;
    case 'project':
      entityType = "project";
      entityId = doc.entityId;
      break;
    case 'user':
      entityType = "user";
      entityId = doc.entityId;
      break;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    if (doc.title !== this.previous.title) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a task's title", entityType, entityId);
    }
    if (doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a task's description", entityType, entityId);
    }
    if (doc.dueDate !== this.previous.dueDate) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a task's due date", entityType, entityId);
    }
    if (doc.completed !== this.previous.completed) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a task's completed status", entityType, entityId);

    }
    if (doc.assigneeId !== this.previous.assigneeId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a task's assigned user", entityType, entityId);
    }
  }
});

Tasks.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  if (doc.taskReminderJob && Meteor.isServer) {
    Meteor.call('deleteTaskReminder', doc.taskReminderJob);
  }

  var entityType;
  var entityId;

  switch (doc.entityType) {
    case 'company':
      entityType = "company";
      entityId = doc.entityId;
      break;
    case 'contact':
      entityType = "contact";
      entityId = doc.entityId;
      break;
    case 'opportunity':
      entityType = "opportunity";
      entityId = doc.entityId;
      break;
    case 'project':
      entityType = "project";
      entityId = doc.entityId;
      break;
    case 'user':
      entityType = "user";
      entityId = doc.entityId;
      break;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted task '" + doc.title + "'", entityType, entityId);
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