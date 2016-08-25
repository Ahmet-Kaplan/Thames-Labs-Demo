import { Companies } from '/imports/api/collections.js';

Meteor.methods({
  'pipeline.getCompany': function(companyId) {
    var company = Companies.findOne({
      _id: companyId
    });
    if (company) return " (" + company.name + ")";
  },
  'pipeline.getContact': function(contactId) {
    var contact = Contacts.findOne({
      _id: this.contactId
    });
    if (contact) return " (" + contact.forename + " " + contact.surname + ")";
  }
});
