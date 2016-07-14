import './company-location-picker.js';
import './company-details-form.html';
import './company-details-form.css';

//companyDetailsForm
Template.companyDetailsForm.helpers({
  companyName: function() {
    return this.companyData.name;
  },
  website: function() {
    return this.companyData.url;
  },
  phone: function() {
    return this.companyData.phone;
  },
  currentUser: function() {
    return Meteor.user()._id;
  },
  companyData: function() {
    return this.companyData;
  }
});