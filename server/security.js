Customers.permit(['insert']).ifHasRole('superadmin').apply();

Meteor.users.permit('insert').ifHasRole('superadmin').apply();

Companies.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Contacts.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
