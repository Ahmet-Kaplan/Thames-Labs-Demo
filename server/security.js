Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').ifLoggedIn().exceptProps(['name']).apply();

Notifications.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Companies.allowTags(function(userId) {
  return !!userId;
});
Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Projects.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
PurchaseOrders.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
PurchaseOrderItems.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Tasks.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Chatterbox.permit(['insert']).ifLoggedIn().apply();

Features.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
