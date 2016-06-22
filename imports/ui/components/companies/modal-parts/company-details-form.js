import './company-details-form.html';
import _ from 'lodash';
import '../../maps/map-editor.js';
import { getAddressFromLookup, getAddressFromGoogleMapsSearch } from '../../maps/map-helpers.js';


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

//companyLocationPicker
Template.companyLocationPicker.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey,
  });

  this.companyData = new ReactiveVar({});
  this.showSearchBox = new ReactiveVar(true);
  this.showSearchedAddress = new ReactiveVar(false);
  this.showManualEntry = new ReactiveVar(false);
  this.showMap = new ReactiveVar(false);

  //Address formatted as {address, address2, city, postcode, county, country, postcode, lng, lat }
  this.address = new ReactiveVar({});

});

Template.companyLocationPicker.onDestroyed(function() {
  this.address = new ReactiveVar({});
});

Template.companyLocationPicker.onRendered(function() {

  Template.instance().showManualEntry.set(false);
  //Updates companyData and address if update on parent template
  this.autorun(() => {
    this.companyData.set(this.data.companyData);

    if (this.data.companyData.geo) {
      var addressData = getAddressFromLookup(this.data.companyData.geo);
      Template.instance().address.set(addressData);
    }
  });

  this.autorun(() => {
    var addressData = Template.instance().address.get();
    if (!Template.instance().showManualEntry.get()) {
      if (_.isEmpty(addressData)) {
        Template.instance().showSearchedAddress.set(false);
        Template.instance().showSearchBox.set(true);
        Template.instance().showMap.set(false);
      } else {
        Template.instance().showSearchedAddress.set(true);
        Template.instance().showSearchBox.set(false);
        Template.instance().showMap.set(true);
      }
    }
  });


  //The location search box
  //Run the geocode search handler and return data into the companyData reactive var
  this.autorun(() => {
    if (GoogleMaps.loaded() && $('#geo').length > 0) {
      var instance = Template.instance();
      $("#geo").geocomplete().bind("geocode:result", (event, result) => {
        var addressData = getAddressFromGoogleMapsSearch(result);
        instance.address.set(addressData);
      });
    }
  });

});

Template.companyLocationPicker.helpers({
  showSearchBox: function() {
    return Template.instance().showSearchBox.get();
  },
  showSearchedAddress: function() {
    return Template.instance().showSearchedAddress.get();
  },
  showManualEntry: function() {
    return Template.instance().showManualEntry.get();
  },
  showMap: function() {
    return Template.instance().showMap.get();
  },

  //Address values
  address: function() {
    return Template.instance().address;
  },
  address1: function() {
    return Template.instance().address.get().address || '';
  },
  address2: function() {
    return Template.instance().address.get().address2 || '';
  },
  city: function() {
    return Template.instance().address.get().city || '';
  },
  county: function() {
    return Template.instance().address.get().county || '';
  },
  country: function() {
    return Template.instance().address.get().country || '';
  },
  postcode: function() {
    return Template.instance().address.get().postcode || '';
  },
  lat: function() {
    return Template.instance().address.get().lat || '';
  },
  lng: function() {
    return Template.instance().address.get().lng || '';
  }
});


Template.companyLocationPicker.events({
  'click #newLocationSearch': function(event) {
    event.preventDefault();

    Template.instance().address.set({});

    $('#geo').val('');
    $('#geo').focus();
  },
  'click #manualAddressEntry': function(event) {
    event.preventDefault();

    //Remove Lng Lat
    var addressData = Template.instance().address.get();
    delete addressData.lng;
    delete addressData.lat;
    Template.instance().address.set(addressData);

    $('#geo').val('');

    Template.instance().showManualEntry.set(true);
    Template.instance().showSearchedAddress.set(false);
    Template.instance().showSearchBox.set(false);
    Template.instance().showMap.set(false);
  }
});
