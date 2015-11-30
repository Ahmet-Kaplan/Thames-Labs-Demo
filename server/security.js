Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').onlyProps(['settings']).ifHasRole('Administrator').apply();

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

AuditLog.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
GlobalAudit.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Products.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateProducts').apply();
Products.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['update']).ifLoggedIn().ifHasRole('CanEditProducts').apply();
Products.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Products.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteProducts').apply();

Opportunities.permit(['insert']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateOpportunities').apply();
Opportunities.permit(['update']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['update']).ifLoggedIn().ifHasRole('CanEditOpportunities').apply();
Opportunities.permit(['remove']).ifLoggedIn().ifHasRole('Administrator').apply();
Opportunities.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteOpportunities').apply();
Opportunities.allowTags(function(userId) {
  return !!userId;
});
