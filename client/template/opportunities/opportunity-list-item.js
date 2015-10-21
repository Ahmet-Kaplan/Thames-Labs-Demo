Template.opportunityListItem.onCreated(function() {
  this.subscribe('companyById', this.data.companyId);
  this.subscribe('contactById', this.data.contactId);
});

Template.opportunityListItem.helpers({
  friendlyEstClose: function() {
    return moment(this.estCloseDate).format('MMMM Do YYYY, h:mma');
  }
});
