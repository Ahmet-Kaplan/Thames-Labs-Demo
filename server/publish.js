Meteor.publish("allTenants", function() {
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return g_Tenants.find({});
  } else {
    this.ready();
  }
});

Meteor.publish("myTenant", function() {
  // return g_Tenants.find({
  //   _id: Meteor.users.find({
  //     _id: Meteor.userId()
  //   }).fetch()[0].group
  // });
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
  return g_Companies.find({});
});
Meteor.publish("companyById", function(companyId) {
  return g_Companies.find({
    _id: companyId
  });
});
Meteor.publish("contactsByCompanyId", function(companyId) {
  return g_Contacts.find({
    companyId: companyId
  });
});


Meteor.publish("allContacts", function() {
  return g_Contacts.find({});
});
Meteor.publish("contactById", function(contactId) {
  return g_Contacts.find({
    _id: contactId
  });
});


Meteor.publish("allActivities", function() {
  return g_Activities.find({});
});
Meteor.publish("activityByContactId", function(contactId) {
  return g_Activities.find({
    contactId: contactId
  });
});
Meteor.publish("activityByCompanyId", function(companyId) {
  return g_Activities.find({
    companyId: companyId
  });
});
Meteor.publish("activityByProjectId", function(projectId) {
  return g_Activities.find({
    projectId: projectId
  });
});
Meteor.publish("activityByPurchaseOrderId", function(purchaseOrderId) {
  return g_Activities.find({
    purchaseOrderId: purchaseOrderId
  });
});


Meteor.publish("allProjects", function() {
  return g_Projects.find({});
});
Meteor.publish("projectsByCompanyId", function(companyId) {
  return g_Projects.find({
    companyId: companyId
  });
});
Meteor.publish("projectById", function(projectId) {
  return g_Projects.find({
    _id: projectId
  });
});


Meteor.publish("allPurchaseOrders", function() {
  return g_PurchaseOrders.find({});
});
Meteor.publish("purchaseOrdersByCompanyId", function(companyId) {
  return g_PurchaseOrders.find({
    supplierCompanyId: companyId
  });
});
Meteor.publish("purchaseOrdersByContactId", function(contactId) {
  return g_PurchaseOrders.find({
    supplierContactId: contactId
  });
});
Meteor.publish("purchaseOrdersByProjectId", function(projectId) {
  return g_PurchaseOrders.find({
    projectId: projectId
  });
});
Meteor.publish("purchaseOrderById", function(purchaseOrderId) {
  return g_PurchaseOrders.find({
    _id: purchaseOrderId
  });
});


Meteor.publish("allPurchaseOrderItems", function(purchaseOrderId) {
  return g_PurchaseOrderItems.find({
    purchaseOrderId: purchaseOrderId
  });
});
