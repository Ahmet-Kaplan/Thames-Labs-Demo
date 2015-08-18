Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').ifLoggedIn().onlyProps(['settings']).apply();

Notifications.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Companies.allowTags(function(userId) {
  return !!userId;
});

Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Contacts.allowTags(function(userId) {
  return !!userId;
});

Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Projects.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Projects.allowTags(function(userId) {
  return !!userId;
});

PurchaseOrders.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
// PurchaseOrders.allowTags(function(userId) {
//   return !!userId;
// });

PurchaseOrderItems.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Tasks.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Chatterbox.permit(['insert']).ifLoggedIn().apply();

AuditLog.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Products.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
