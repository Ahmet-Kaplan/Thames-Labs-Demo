Template.opportunityListItem.onCreated(function() {
  // N.B. at time of writing there already exist allCompanies and allContacts
  // subscriptions on the route, but that will need to be removed in the future
  this.subscribe('companyById', this.companyId);
  this.subscribe('contactById', this.contactId);
});
