Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Notifications.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();
// Meteor.users.permit(['update']).ifLoggedIn().apply();

Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Projects.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
PurchaseOrders.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
PurchaseOrderItems.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Chatterbox.permit(['insert']).ifLoggedIn().apply();
