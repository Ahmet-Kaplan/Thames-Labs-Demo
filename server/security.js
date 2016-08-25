Tenants.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();
Tenants.permit('update').onlyProps(['settings', 'name']).ifHasRole('Administrator').apply();

Meteor.users.permit(['insert', 'remove']).ifHasRole('superadmin').apply();

Companies.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateCompanies').apply();
Companies.permit(['update']).ifLoggedIn().ifHasRole('CanEditCompanies').apply();
Companies.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteCompanies').apply();
Companies.allowTags(function(userId) {
  return !!userId;
});

Contacts.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateContacts').apply();
Contacts.permit(['update']).ifLoggedIn().ifHasRole('CanEditContacts').apply();
Contacts.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteContacts').apply();
Contacts.allowTags(function(userId) {
  return !!userId;
});

Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Activities.allowTags(function(userId) {
  return !!userId;
});

CustomFields.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

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
