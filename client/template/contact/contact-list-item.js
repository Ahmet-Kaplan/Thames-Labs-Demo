Template.contactListItem.onRendered(function() {
  this.subscribe('companyById', this.data.companyId);
});
