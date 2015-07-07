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
  } else {
    this.ready();
  }
});

Meteor.publish("myTenant", function() {
  // return Tenants.find({
  //   _id: Meteor.users.find({
  //     _id: Meteor.userId()
  //   }).fetch()[0].group
  // });
});

Meteor.publish("currentTenantUserData", function(groupId) {
  return Meteor.users.find({
    group: groupId
  });
});

Meteor.publish("allUserData", function() {

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

Meteor.publish("allCompanies", function() {
  return Companies.find({});
});
Meteor.publish("companyById", function(companyId) {
  return Companies.find({
    _id: companyId
  });
});
Meteor.publish("contactsByCompanyId", function(companyId) {
  return Contacts.find({
    companyId: companyId
  });
});
Meteor.publish("companyTags", function() {
  return Meteor.tags.find({collection: 'companies'});
});

Meteor.publish("allContacts", function() {
  return Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  return Contacts.find({
    _id: contactId
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
Meteor.publish("projectById", function(projectId) {
  return Projects.find({
    _id: projectId
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
  return Tasks.find({entityId: entityId});
});

Meteor.publish("allUserTasks", function(userId) {
  return Tasks.find({createdBy: userId});
});
