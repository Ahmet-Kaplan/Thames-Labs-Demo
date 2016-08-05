import './update-opportunity-modal.html';

Template.editOpportunityModal.helpers({
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    const contact = Contacts.findOne({
      _id: this.contactId
    });
    return `${contact.forename} ${contact.surname}`;
  }
});
