Customers.permit(['insert']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Projects.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

PurchaseOrders.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

PurchaseOrderItems.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Tasks.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
