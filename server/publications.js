import { Activities, Notifications, Projects, Products, PurchaseOrders, PurchaseOrderItems, Opportunities, Tasks } from '/imports/api/collections.js';
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
Meteor.publish("activityByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    projectId: projectId
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


Meteor.publish("allProjects", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({});
});
Meteor.publish("projectsByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    companyId: companyId
  });
});
Meteor.publish("projectsByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    contactId: contactId
  });
});
Meteor.publish("projectById", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    _id: projectId
  });
});


Meteor.publish("allPurchaseOrders", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({});
});
Meteor.publish("purchaseOrdersByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    supplierCompanyId: companyId
  });
});
Meteor.publish("purchaseOrdersByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    supplierContactId: contactId
  });
});
Meteor.publish("purchaseOrdersByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    projectId: projectId
  });
});
Meteor.publish("purchaseOrderById", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    _id: purchaseOrderId
  });
});

Meteor.publish("allPurchaseOrderItemsNoPOID", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrderItems.find({});
});

Meteor.publish("allPurchaseOrderItems", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrderItems.find({
    purchaseOrderId: purchaseOrderId
  });
});

Meteor.publish("allPurchaseOrderItemsByProject", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrderItems.find({
    projectId: projectId
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

//Products
Meteor.publish("allProducts", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadProducts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Products.find({});
});
Meteor.publish("productById", function(productId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadProducts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Products.find({
    _id: productId
  });
});

//Opportunities
Meteor.publish("allOpportunities", function() {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find();
});
Meteor.publish("opportunityById", function(oppId) {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    _id: oppId
  });
});
Meteor.publish("opportunitiesByProjectId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    projectId: id
  });
});
Meteor.publish("opportunitiesByCompanyId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    companyId: id,
    // isArchived: {
      // $ne: true
    // }
  });
});
Meteor.publish("opportunitiesByContactId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    contactId: id,
    // isArchived: {
      // $ne: true
    // }
  });
});
Meteor.publish("salesPipelineOpportunities", function() {
  // Created separate publication in case we want to (e.g.) limit number returned
  if (!Roles.userIsInRole(this.userId, ['CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    isArchived: { $ne: true }
  });
});

////////////////////////////////////////////////////////////////////
// Global search publications
////////////////////////////////////////////////////////////////////

Meteor.publish("allRecords", function(selector, options) {

  Autocomplete.publishCursor(Companies.find(selector, options), this);
  Autocomplete.publishCursor(Contacts.find(selector, options), this);
  Autocomplete.publishCursor(Opportunities.find(selector, options), this);
  Autocomplete.publishCursor(Projects.find(selector, options), this);
  Autocomplete.publishCursor(Products.find(selector, options), this);
  Autocomplete.publishCursor(PurchaseOrders.find(selector, options), this);

  this.ready();
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
