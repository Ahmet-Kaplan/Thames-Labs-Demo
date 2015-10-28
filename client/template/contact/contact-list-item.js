Template.contactListItem.onRendered(function() {
  this.subscribe('companyById', this.data.companyId);
});

Template.contactListItem.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  }
});
