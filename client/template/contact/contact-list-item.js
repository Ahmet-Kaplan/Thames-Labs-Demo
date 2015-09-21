Template.contactListItem.onRendered(function() {
  this.subscribe('companyByContactId', this.data._id);
});
