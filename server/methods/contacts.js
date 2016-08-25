import { Companies } from '/imports/api/collections.js';

Meteor.methods({
  'contact.linkCompanyAddress': function(contactId) {
    var contact = Contacts.findOne({_id: contactId});
    if(!contact) return;
    var company = Companies.findOne({_id: contact.companyId});
    if(company) {
      Contacts.update({
        _id: contactId
      }, {
        $set: {
          address: company.address,
          city: company.city,
          county: company.county,
          postcode: company.postcode,
          country: company.country,
        }
      });
    }
  }
});