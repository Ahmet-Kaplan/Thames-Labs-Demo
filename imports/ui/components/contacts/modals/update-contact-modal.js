import './update-contact-modal.html';

Template.updateContactModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey
  });
});

Template.updateContactModal.onRendered(function() {
  if (Meteor.user()) {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      let options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          };
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }
});

Template.updateContactModal.helpers({
  noCompany: function() {
    return typeof this.companyId === "undefined";
  },
  showTitleField: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  },
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