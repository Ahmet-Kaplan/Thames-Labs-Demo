Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').onlyProps(['settings', 'name']).ifHasRole('Administrator').apply();

Notifications.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Companies.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Companies.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateCompanies').apply();
Companies.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Companies.permit(['update']).ifLoggedIn().ifHasRole('CanEditCompanies').apply();
Companies.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Companies.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteCompanies').apply();
Companies.allowTags(function(userId) {
  return !!userId;
});

Contacts.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Contacts.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateContacts').apply();
Contacts.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Contacts.permit(['update']).ifLoggedIn().ifHasRole('CanEditContacts').apply();
Contacts.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Contacts.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteContacts').apply();
Contacts.allowTags(function(userId) {
  return !!userId;
});

Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Activities.allowTags(function(userId) {
  return !!userId;
});

CustomFields.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Projects.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Projects.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateProjects').apply();
Projects.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Projects.permit(['update']).ifLoggedIn().ifHasRole('CanEditProjects').apply();
Projects.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Projects.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteProjects').apply();
Projects.allowTags(function(userId) {
  return !!userId;
});


PurchaseOrders.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrders.permit(['insert']).ifLoggedIn().ifHasRole('CanCreatePurchaseOrders').apply();
PurchaseOrders.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrders.permit(['update']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrders.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrders.permit(['remove']).ifLoggedIn().ifHasRole('CanDeletePurchaseOrders').apply();
PurchaseOrders.allowTags(function(userId) {
  return !!userId;
});


PurchaseOrderItems.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrderItems.permit(['insert']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrderItems.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrderItems.permit(['update']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrderItems.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
PurchaseOrderItems.permit(['remove']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();

Tasks.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Tasks.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateTasks').apply();
Tasks.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Tasks.permit(['update']).ifLoggedIn().ifHasRole('CanEditTasks').apply();
Tasks.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Tasks.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteTasks').apply();
Tasks.allowTags(function(userId) {
  return !!userId;
});

Chatterbox.permit(['insert']).ifLoggedIn().apply();

EventLog.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Products.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateProducts').apply();
Products.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['update']).ifLoggedIn().ifHasRole('CanEditProducts').apply();
Products.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteProducts').apply();
Products.allowTags(function(userId) {
  return !!userId;
});

Opportunities.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateOpportunities').apply();
Opportunities.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['update']).ifLoggedIn().ifHasRole('CanEditOpportunities').apply();
Opportunities.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteOpportunities').apply();
Opportunities.allowTags(function(userId) {
  return !!userId;
});

ServerSession.setCondition(function(key, value) {
  // Check for user ID. If not there, forcibly return true to ensure that the server can do whatever it needs to.
  // If this is a user request, check which key they're trying to set and whether or not they're a super
  // before allowing the change to take place
  if(Meteor.userId()) {
    if(key !== "DocxToPdfRemaining" && Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
      return true;
    }
    return false;
  }
  return true;
});
