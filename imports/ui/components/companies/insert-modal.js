import './modal-parts/company-lookup.js';
import './modal-parts/company-details-form.js';
import './insert-modal.html';

/*
  This template provides a form to create a company
  Uses two parts:
    lookup form - uses clearbit and companies house to find details
                  returns results to this template
    details form - is populated by the lookup form results, uses autoform
*/
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