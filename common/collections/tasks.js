Tasks = new Mongo.Collection('tasks');
Collections.tasks = Tasks;
Partitioner.partitionCollection(Tasks);
Tags.TagsMixin(Tasks);

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
