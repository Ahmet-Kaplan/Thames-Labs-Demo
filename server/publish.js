Meteor.publish("purchaseOrderItems", function(purchaseOrderId) {
  return PurchaseOrderItems.find({purchaseOrderId: purchaseOrderId});
});

Meteor.publish("purchaseOrders", function() {
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
Meteor.publish("ownerPurchaseOrders", function(ownerId) {
  return PurchaseOrders.find({
    createdBy: ownerId
  });
});

Meteor.publish("projects", function() {
  return Projects.find({});
});
Meteor.publish("projectsByCompanyId", function(companyId) {
  return Projects.find({
    companyId: companyId
  });
});
Meteor.publish("projectById", function(projectId) {
  return Projects.find({
    _id: projectId
  });
});
Meteor.publish("ownerProjects", function(ownerId) {
  return Projects.find({
    createdBy: ownerId
  });
});

Meteor.publish("companies", function() {
  return Companies.find({});
});
Meteor.publish("companyById", function(companyId) {
  return Companies.find({
    _id: companyId
  });
});
Meteor.publish("ownerCompanies", function(ownerId) {
  return Companies.find({
    createdBy: ownerId
  });
});

Meteor.publish("contacts", function() {
  return Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  return Contacts.find({
    _id: contactId
  });
});
Meteor.publish("contactByCompanyId", function(companyId) {
  return Contacts.find({
    companyId: companyId
  });
});
Meteor.publish("ownerContacts", function(ownerId) {
  return Contacts.find({
    createdBy: ownerId
  });
});

Meteor.publish("activities", function() {
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
Meteor.publish("ownerActivities", function(ownerId) {
  return Activities.find({
    createdBy: ownerId
  });
});

Meteor.publish("tasks", function() {
  return Tasks.find({});
});
Meteor.publish("tasksByUserId", function(userId) {
  return Tasks.find({userId: userId});
});

Meteor.publish("customers", function() {

  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Customers.find({});
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});

Meteor.publish("userData", function() {

  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Meteor.users.find({}, {
      fields: {
        'group': true,
        'username': true,
        'emails': true,
        'profile': true
      }
    });
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});
