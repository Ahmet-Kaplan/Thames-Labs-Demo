Template.opportunityListItem.onCreated(function() {
  this.subscribe('companyById', this.data.companyId);
  this.subscribe('contactById', this.data.contactId);
});

Template.opportunityListItem.helpers({
  salesManager: function() {
    var user = Meteor.users.findOne({
      _id: this.salesManagerId
    });
    if (user) return user.profile.name;
  },
  friendlyEstClose: function() {
    return moment(this.estCloseDate).format('MMMM Do YYYY, h:mma');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  }
});
