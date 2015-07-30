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
    return AuditLog.find({});
  } else {
    this.ready();
  }
});

Meteor.publish("groupedAuditData", function(userId) {
  var group = null;

  var ux = Meteor.users.find({
    _id: userId
  }).fetch()[0];
  if (ux) {
    group = ux.group;
  }

  console.log("Group: " + group);
  return AuditLog.find({
    groupId: group
  });
});

Meteor.publish("allTenants", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Tenants.find({});
  } else {
    this.ready();
  }
});

Meteor.publish("myTenant", function(groupId) {
  return Tenants.find({
    _id: groupId
  });
});

Meteor.publish("currentTenantUserData", function(groupId) {
  return Meteor.users.find({
    group: groupId
  }, {
    fields: {
      services: false
    }
  });
});
Meteor.publish("allUserData", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Meteor.users.find({}, {
      fields: {
        'group': true,
        'username': true,
        'emails': true,
        'profile': true,
        'createdAt': true
      }
    });
  } else {
    // User not superadmin, do not publish
    this.ready();
  }
});

Meteor.publish("allCompanies", function() {
  if (!this.userId) return this.ready();
  return Companies.find({});
});
Meteor.publish("companyById", function(companyId) {
  return Companies.find({
    _id: companyId
  });
});
Meteor.publish("companyByContactId", function(contactId) {
  var contact = Contacts.findOne(contactId);
  return Companies.find(contact.companyId);
});
Meteor.publish("companyByProjectId", function(projectId) {
  var project = Projects.findOne(projectId);
  return Companies.find(project.companyId);
});
Meteor.publish("companyByPurchaseOrderId", function(purchaseOrderId) {
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Companies.find(purchaseOrder.companyId);
});
Meteor.publish("companyByProductId", function(productId) {
  var p = Products.findOne(productId);
  return Companies.find(p.companyId);
});
Meteor.publish("companyTags", function() {
  return Meteor.tags.find({
    collection: 'companies'
  });
});

Meteor.publish("allContacts", function() {
  return Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  return Contacts.find({
    _id: contactId
  });
});
Meteor.publish("contactsByCompanyId", function(companyId) {
  return Contacts.find({
    companyId: companyId
  });
});
Meteor.publish("contactsByProjectId", function(projectId) {
  var project = Projects.findOne(projectId);
  return Contacts.find(project.contactId);
});
Meteor.publish("contactByPurchaseOrderId", function(purchaseOrderId) {
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Contacts.find(purchaseOrder.contactId);
});
Meteor.publish("contactByProductId", function(productId) {
  var p = Products.findOne(productId);
  return Contacts.find(p.companyId);
});
Meteor.publish("contactTags", function() {
  return Meteor.tags.find({
    collection: 'contacts'
  });
});

Meteor.publish("allActivities", function() {
  return Activities.find({});
});
Meteor.publish("activityByContactId", function(contactId) {
  return Activities.find({
    contactId: contactId
  });
});
Meteor.publish("activityByCompanyId", function(companyId) {
  return Activities.find({
    companyId: companyId
  });
});
Meteor.publish("activityByProjectId", function(projectId) {
  return Activities.find({
    projectId: projectId
  });
});
Meteor.publish("activityByPurchaseOrderId", function(purchaseOrderId) {
  return Activities.find({
    purchaseOrderId: purchaseOrderId
  });
});

Meteor.publish("allProjects", function() {
  return Projects.find({});
});
Meteor.publish("projectsByCompanyId", function(companyId) {
  return Projects.find({
    companyId: companyId
  });
});
Meteor.publish("projectsByContactId", function(contactId) {
  return Projects.find({
    contactId: contactId
  });
});
Meteor.publish("projectById", function(projectId) {
  return Projects.find({
    _id: projectId
  });
});
Meteor.publish("projectByPurchaseOrderId", function(purchaseOrderId) {
  var purchaseOrder = PurchaseOrders.findOne(purchaseOrderId);
  return Projects.find(purchaseOrder.projectId);
});
Meteor.publish("projectTags", function() {
  return Meteor.tags.find({
    collection: 'projects'
  });
});

Meteor.publish("allPurchaseOrders", function() {
  return PurchaseOrders.find({});
});
Meteor.publish("purchaseOrdersByCompanyId", function(companyId) {
  return PurchaseOrders.find({
    supplierCompanyId: companyId
  });
});
Meteor.publish("purchaseOrdersByContactId", function(contactId) {
  return PurchaseOrders.find({
    supplierContactId: contactId
  });
});
Meteor.publish("purchaseOrdersByProjectId", function(projectId) {
  return PurchaseOrders.find({
    projectId: projectId
  });
});
Meteor.publish("purchaseOrderById", function(purchaseOrderId) {
  return PurchaseOrders.find({
    _id: purchaseOrderId
  });
});
// Meteor.publish("purchaseOrderTags", function() {
//   return Meteor.tags.find({
//     collection: 'purchaseOrders'
//   });
// });


Meteor.publish("allPurchaseOrderItems", function(purchaseOrderId) {
  return PurchaseOrderItems.find({
    purchaseOrderId: purchaseOrderId
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
  return Chatterbox.find({});
});

Meteor.publish("allTasks", function() {
  return Tasks.find({});
});
Meteor.publish("tasksByEntityId", function(entityId) {
  return Tasks.find({
    entityId: entityId
  });
});
Meteor.publish("allUserTasks", function(userId) {
  return Tasks.find({
    assigneeId: userId
  });
});

Meteor.publish("allFeatures", function() {
  return Features.find({});
});

//Products
Meteor.publish("allProducts", function() {
  return Products.find({});
});
Meteor.publish("productById", function(productId) {
  return Products.find({
    _id: productId
  });
});
