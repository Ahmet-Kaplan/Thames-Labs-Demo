Customers.permit(['insert']).ifHasRole('superadmin').apply();

Meteor.users.permit('insert').ifHasRole('superadmin').apply();

Companies.permit(['insert']).ifLoggedIn().apply();
