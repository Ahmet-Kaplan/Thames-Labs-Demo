import { Activities, Companies, Contacts, CustomFields, Notifications, Jobs, Tasks, Tenants } from '/imports/api/collections.js';
Meteor.publish('userPresence', function() {
  var filter = {
    userId: {
      $exists: true
    }
  };

  return Presences.find(filter, {
    fields: {
      state: true,
      userId: true
    }
  });
});

Meteor.publish("allTenants", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Tenants.find({});
  }
  this.ready();
});

Meteor.publish("activeTenantData", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tenants.find({
    _id: Partitioner.getUserGroup(this.userId)
  });
});

Meteor.publish("currentTenantUserData", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.users.find({}, {
    fields: {
      services: false
    }
  });
});
Meteor.publish("allUserData", function() {
  if (!Roles.userIsInRole(this.userId, ['superadmin'])) return this.ready();
  return Partitioner.directOperation(function() {
    return Meteor.users.find({}, {
      fields: {
        'group': true,
        'username': true,
        'emails': true,
        'profile': true,
        'createdAt': true
      }
    });
  });
});

Meteor.publish("allCompanies", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Companies.find({});
});

Meteor.publish("companyById", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Companies.find({
    _id: companyId
  });
});

Meteor.publish("lightCompanyById", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Companies.find({
    _id: companyId
  }, {
    fields: {
      'name': 1
    }
  });
});


Meteor.publish("allContacts", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({
    _id: contactId
  });
});
Meteor.publish("contactsByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({
    companyId: companyId
  });
});
Meteor.publish("lightContactById", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({
    _id: contactId
  }, {
    fields: {
      forename: 1,
      surname: 1
    }
  });
});


Meteor.publish("activityByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    contactId: contactId
  });
});
Meteor.publish("activityByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    companyId: companyId
  });
});
Meteor.publish("activityByJobId", function(jobId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadJobs'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    jobId: jobId
  });
});
Meteor.publish("activityByPurchaseOrderId", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    purchaseOrderId: purchaseOrderId
  });
});
Meteor.publish("activityByOpportunityId", function(opportunityId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    opportunityId: opportunityId
  });
});
Meteor.publish("activityByTaskId", function(taskId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    taskId: taskId
  });
});

Meteor.publish("customFieldsByEntityId", function(entityId, entityName, collectionName) {
  const permissionRequired = permissionGenerator('read', collectionName);
  if (!Roles.userIsInRole(this.userId, [permissionRequired])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return CustomFields.find({
    target: entityName,
    entityId: entityId
  });
});
Meteor.publish("globalCustomFields", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return CustomFields.find({
    global: true,
    entityId: Partitioner.getUserGroup(this.userId)
  });
});


Meteor.publish("allJobs", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadJobs'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Jobs.find({});
});
Meteor.publish("jobsByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadJobs'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Jobs.find({
    companyId: companyId
  });
});
Meteor.publish("jobsByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadJobs'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Jobs.find({
    contactId: contactId
  });
});
Meteor.publish("jobById", function(jobId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadJobs'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Jobs.find({
    _id: jobId
  });
});

Meteor.publish("allNotifications", function() {
  return Notifications.find({}, {
    sort: {
      createdAt: -1
    }
  });
});

Meteor.publish("allTasks", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({});
});
Meteor.publish("taskById", function(taskId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    _id: taskId
  });
});
Meteor.publish("tasksByEntityId", function(entityId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    entityId: entityId
  });
});
Meteor.publish("allUserTasks", function(userId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    assigneeId: userId
  });
});
Meteor.publish("subTasksByTaskId", function(taskId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    parentTaskId: taskId
  });
});

////////////////////////////////////////////////////////////////////
// Tag publications
////////////////////////////////////////////////////////////////////

Meteor.publish('tagsByCollection', function(collectionName) {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  // Shortcut permissions check for activities as their permissions aren't sorted
  if (collectionName === 'activities') {
    return Meteor.tags.find({
      collection: 'activities'
    });
  }
  var permissionRequired = permissionGenerator('read', collectionName);
  if (!Roles.userIsInRole(this.userId, [permissionRequired])) return this.ready();
  return Meteor.tags.find({
    collection: collectionName
  });
});
