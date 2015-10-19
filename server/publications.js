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

Meteor.publish("auditData", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Partitioner.directOperation(function() {
      return AuditLog.find({});
    });
  } else {
    return this.ready();
  }
});

Meteor.publish("eventLogData", function(userId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadEventLog'])) return this.ready();
  return AuditLog.find({});
});

Meteor.publish("allTenants", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Tenants.find({});
  } else {
    this.ready();
  }
});

Meteor.publish("activeTenantData", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tenants.find({
    _id: Partitioner.getUserGroup(this.userId)
  });
});

Meteor.publish("currentTenantUserData", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.users.find({
    group: Partitioner.getUserGroup(this.userId)
  }, {
    fields: {
      services: false
    }
  });
});
Meteor.publish("allUserData", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
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
  } else {
    // User not superadmin, do not publish
    this.ready();
  }
});

Meteor.publish("allCompanies", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Companies.find({});
});

Meteor.publish("companyById", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Companies.find({
    _id: companyId
  });
});
Meteor.publish("companyByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var contact = Contacts.findOne(contactId);
  return Companies.find(contact.companyId);
});
Meteor.publish("companyByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var project = Projects.findOne(projectId);
  return Companies.find(project.companyId);
});
Meteor.publish("companyByPurchaseOrderId", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Companies.find(purchaseOrder.companyId);
});
Meteor.publish("companyByProductId", function(productId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var p = Products.findOne(productId);
  return Companies.find(p.companyId);
});
Meteor.publish("companyByOpportunityId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var opp = Opportunities.findOne(id);
  return Companies.find(opp.companyId);
});
Meteor.publish("companyTags", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.tags.find({
    collection: 'companies'
  });
});


Meteor.publish("allContacts", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({
    _id: contactId
  });
});
Meteor.publish("contactsByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Contacts.find({
    companyId: companyId
  });
});
Meteor.publish("contactsByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var project = Projects.findOne(projectId);
  return Contacts.find(project.contactId);
});
Meteor.publish("contactByPurchaseOrderId", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Contacts.find(purchaseOrder.contactId);
});
Meteor.publish("contactByProductId", function(productId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var p = Products.findOne(productId);
  return Contacts.find(p.companyId);
});
Meteor.publish("contactByOpportunityId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var opp = Opportunities.findOne(id);
  return Contacts.find(opp.contactId);
});
Meteor.publish("contactTags", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.tags.find({
    collection: 'contacts'
  });
});


Meteor.publish("allActivities", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadActivities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({});
});
Meteor.publish("activityByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadContacts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    contactId: contactId
  });
});
Meteor.publish("activityByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadCompanies'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    companyId: companyId
  });
});
Meteor.publish("activityByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    projectId: projectId
  });
});
Meteor.publish("activityByPurchaseOrderId", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    purchaseOrderId: purchaseOrderId
  });
});
Meteor.publish("activityByOpportunityId", function(opportunityId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Activities.find({
    opportunityId: opportunityId
  });
});


Meteor.publish("allProjects", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({});
});
Meteor.publish("projectsByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    companyId: companyId
  });
});
Meteor.publish("projectsByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    contactId: contactId
  });
});
Meteor.publish("projectById", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Projects.find({
    _id: projectId
  });
});
Meteor.publish("projectByPurchaseOrderId", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Projects.find(purchaseOrder.projectId);
});
Meteor.publish("projectTags", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProjects'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.tags.find({
    collection: 'projects'
  });
});


Meteor.publish("allPurchaseOrders", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({});
});
Meteor.publish("purchaseOrdersByCompanyId", function(companyId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    supplierCompanyId: companyId
  });
});
Meteor.publish("purchaseOrdersByContactId", function(contactId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    supplierContactId: contactId
  });
});
Meteor.publish("purchaseOrdersByProjectId", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    projectId: projectId
  });
});
Meteor.publish("purchaseOrderById", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrders.find({
    _id: purchaseOrderId
  });
});

Meteor.publish("allPurchaseOrderItemsNoPOID", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrderItems.find({});
});

Meteor.publish("allPurchaseOrderItems", function(purchaseOrderId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return PurchaseOrderItems.find({
    purchaseOrderId: purchaseOrderId
  });
});

Meteor.publish("allPurchaseOrderItemsByProject", function(projectId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadPurchaseOrders'])) return this.ready();
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

Meteor.publish("allChatter", function() {
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Chatterbox.find({});
});


Meteor.publish("allTasks", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({});
});
Meteor.publish("tasksByEntityId", function(entityId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    entityId: entityId
  });
});
Meteor.publish("allUserTasks", function(userId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadTasks'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Tasks.find({
    assigneeId: userId
  });
});
Meteor.publish("taskTags", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadTags'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.tags.find({
    collection: 'tasks'
  });
});

//Products
Meteor.publish("allProducts", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProducts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Products.find({});
});
Meteor.publish("productById", function(productId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadProducts'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Products.find({
    _id: productId
  });
});

//Opportunities
Meteor.publish("allOpportunities", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find();
});
Meteor.publish("opportunityStages", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return OpportunityStages.find({}, {
    sort: {
      order: 1
    }
  });
});
Meteor.publish("opportunityById", function(oppId) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    _id: oppId
  });
});
Meteor.publish("opportunityByProjectId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    projectId: id
  });
});
Meteor.publish("opportunitiesByCompanyId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    companyId: id,
    isArchived: {
      $ne: true
    }
  });
});
Meteor.publish("opportunitiesByContactId", function(id) {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Opportunities.find({
    contactId: id,
    isArchived: {
      $ne: true
    }
  });
});
Meteor.publish("opportunityTags", function() {
  if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanReadOpportunities'])) return this.ready();
  if (!this.userId || !Partitioner.getUserGroup(this.userId)) return this.ready();
  return Meteor.tags.find({
    collection: 'opportunities'
  });
});
////////////////////////////////////////////////////////////////////
// Global search publications
////////////////////////////////////////////////////////////////////
Meteor.publish("allRecords", function(selector, options) {

  Autocomplete.publishCursor(Companies.find(selector, options), this);
  Autocomplete.publishCursor(Contacts.find(selector, options), this);

  this.ready();
});
////////////////////////////////////////////////////////////////////
