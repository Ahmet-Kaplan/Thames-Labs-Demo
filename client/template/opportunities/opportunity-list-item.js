Template.opportunityListItem.onCreated(function() {
  this.subscribe('allContacts');
  this.subscribe('allCompanies');
  this.subscribe('opportunityStages');
  this.subscribe('opportunityTags');
});

Template.opportunityListItem.helpers({
  friendlyEstClose: function() {
    return moment(this.estCloseDate).format('MMMM Do YYYY, h:mma');
  }
});
