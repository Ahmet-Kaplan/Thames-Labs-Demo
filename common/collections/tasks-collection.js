Tasks = new Mongo.Collection('tasks');
Collections.tasks = Tasks;
Partitioner.partitionCollection(Tasks);
Tags.TagsMixin(Tasks);

Tasks.helpers({
  activities: function() {
    return Activities.find({
      taskId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
})

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
    valueField: '__originalId',
    nameField: 'name'
  }
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.tasks.index = TasksIndex = new EasySearch.Index({
  collection: Tasks,
  fields: ['title'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'dueDate': 1 }
    },
    fields: (searchObject, options) => {
      return {
        'title': 1,
        'dueDate': 1,
        'reminder': 1,
        'completed': 1,
        'entityType': 1,
        'entityId': 1,
        'assigneeId': 1,
        'tags': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      var userId = options.search.userId;

      if(options.search.props.assignee) {
        // n.b. the array is passed as a comma separated string
        selector.assigneeId = {$in: options.search.props.assignee.split(',')};
      }

      if(options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {$in: options.search.props.company.split(',')};
      }

      if(options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {$in: options.search.props.contact.split(',')};
      }

      if(options.search.props.opportunity) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {$in: options.search.props.opportunity.split(',')};
      }

      if(options.search.props.project) {
        // n.b. the array is passed as a comma separated string
        selector.entityId = {$in: options.search.props.project.split(',')};
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = { $in: options.search.props.tags.split(',') };
      }

      if (options.search.props.showCompleted) {
        selector.completed = true;
      } else {
        selector.completed = { $ne: true };
      }

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
  if(doc.remindMe && doc.reminder && Meteor.isServer) {
    Meteor.call('addTaskReminder', doc._id);
  }

  var entity;
  var entityName;
  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'opportunity':
      entity = Opportunities.findOne(doc.entityId);
      entityName = "Opportunity: " + entity.name;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }

  logEvent('info', 'A new task has been created: ' + doc.title + ' (' + entityName + ")");
});

Tasks.after.update(function(userId, doc, fieldNames, modifier, options) {
  if(Meteor.isServer) {
    Meteor.call('editTaskReminder', doc._id);
  }

  var entity;
  var entityName;

  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'opportunity':
      entity = Opportunities.findOne(doc.entityId);
      entityName = "Opportunity: " + entity.name;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }

  if (doc.title !== this.previous.title) {
    logEvent('info', 'An existing task has been updated: The value of "title" was changed from ' + this.previous.title + " to " + doc.title + ' (' + entityName + ")");
  }
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing task has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description + ' (' + entityName + ")");
  }
  if (doc.dueDate !== this.previous.dueDate) {
    logEvent('info', 'An existing task has been updated: The value of "dueDate" was changed from ' + this.previous.dueDate + " to " + doc.dueDate + ' (' + entityName + ")");
  }
  if (doc.completed !== this.previous.completed) {
    logEvent('info', 'An existing task has been updated: The value of "completed" was changed from ' + this.previous.completed + " to " + doc.completed + ' (' + entityName + ")");
  }
  if (doc.entityType !== this.previous.entityType) {
    logEvent('info', 'An existing task has been updated: The value of "entityType" was changed from ' + this.previous.entityType + " to " + doc.entityType + ' (' + entityName + ")");
  }

  if (doc.entityId !== this.previous.entityId) {
    var prevEntity;
    var prevEntityName;
    switch (this.previous.entityType) {
      case 'company':
        prevEntity = Companies.findOne(this.previous.entityId);
        prevEntityName = "Company: " + prevEntity.name;
        break;
      case 'contact':
        prevEntity = Contacts.findOne(this.previous.entityId);
        prevEntityName = "Contact: " + prevEntity.forename + " " + prevEntity.surname;
        break;
      case 'opportunity':
        prevEntity = Opportunities.findOne(this.previous.entityId);
        prevEntityName = "Opportunity: " + prevEntity.name;
        break;
      case 'project':
        prevEntity = Projects.findOne(this.previous.entityId);
        prevEntityName = "Project: " + prevEntity.description;
        break;
      case 'user':
        prevEntity = Meteor.users.findOne(this.previous.entityId);
        prevEntityName = "User: " + prevEntity.profile.name;
        break;
    }

    logEvent('info', 'An existing task has been updated: The value of "entityId" was changed from ' + this.previous.entityId + ' (' + prevEntityName + ") to " + doc.entityId + ' (' + entityName + ")");
  }
  if (doc.assigneeId !== this.previous.assigneeId) {
    var prevUser = Meteor.users.findOne(this.previous.assigneeId);
    var newUser = Meteor.users.findOne(doc.assigneeId);
    logEvent('info', 'An existing task has been updated: The value of "assigneeId" was changed from ' + this.previous.assigneeId + '(' + prevUser.profile.name + ") to " + doc.assigneeId + ' (' + newUser.profile.name + ')');
  }
});

Tasks.after.remove(function(userId, doc) {
  if(doc.taskReminderJob && Meteor.isServer) {
    Meteor.call('deleteTaskReminder', doc.taskReminderJob);
  }

  var entity;
  var entityName;
  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'opportunity':
      entity = Opportunities.findOne(doc.entityId);
      entityName = "Opportunity: " + entity.name;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }
  logEvent('info', 'An existing task has been deleted: ' + doc.title + '(' + entityName + ")");
});
