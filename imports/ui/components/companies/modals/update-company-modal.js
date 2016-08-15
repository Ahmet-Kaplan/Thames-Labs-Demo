import '../modal-parts/company-location-picker.js';
import '../modal-parts/company-details-form.css';
import './update-company-modal.html';

import 'meteor/peppelg:bootstrap-3-modal';

Template.updateCompanyModal.helpers({
  addressData: function() {
    const currentData = Template.currentData();
    const address = {
      address: currentData.address,
      address2: currentData.address2,
      city: currentData.city,
      postcode: currentData.postcode,
      county: currentData.county,
      country: currentData.country,
      lng: currentData.lng,
      lat: currentData.lat
    };
    return address;
  }
});

Template.updateCompanyModal.events({
  'click #update-company'() {
    Modal.hide();
  }
});