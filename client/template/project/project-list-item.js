Template.projectListItem.onCreated(function() {
  this.subscribe('companyById', this.data.companyId);
  this.subscribe('contactById', this.data.contactId);
});

Template.projectListItem.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
});
