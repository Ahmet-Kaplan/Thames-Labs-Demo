import './update-opportunity-modal.html';

Template.updateOpportunityModal.helpers({
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

AutoForm.hooks({
  updateOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity details updated.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity update error: ' + error);
    }
  }
});
