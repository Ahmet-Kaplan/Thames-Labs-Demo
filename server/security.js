g_Tenants.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

g_Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
g_Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
g_Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
g_Projects.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
g_PurchaseOrders.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
g_PurchaseOrderItems.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
