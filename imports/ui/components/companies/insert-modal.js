import './modal-parts/company-lookup.js';
import './modal-parts/company-details-form.js';
import './insert-modal.html';

//companyDetailsForm
Template.insertCompanyModal.onCreated(function() {
  this.lookupComplete = new ReactiveVar(false);
  this.companyData = new ReactiveVar({});

  // Load google maps in advance because it is used later
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey,
  });
});
Template.insertCompanyModal.helpers({
  lookupComplete: function() {
    return Template.instance().lookupComplete.get();
  },
  companyData: function() {
    return Template.instance().companyData.get();
  },
  lookupResponse(res) {
    const currentInstance = Template.instance();
    return {
      completedLookup(data) {
        currentInstance.companyData.set(data);
        currentInstance.lookupComplete.set(true);
      }
    };
  }
});