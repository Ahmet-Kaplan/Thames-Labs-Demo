import _ from 'lodash';

//Converts result from Google Maps API call to RT's address format
//result: google.maps.places.PlaceResult
const getAddressFromGoogleMapsSearch = (result) => {
  var addressData = {};

  //Premise
  var premise = _.find(result.address_components, (elt) => (elt.types.indexOf("premise") !== -1));
  if (typeof premise !== 'undefined') {
    premise = premise.long_name;
  }
  addressData.address = premise || '';

  //Street Number + Name
  var strNumber = _.find(result.address_components, (elt) => (elt.types.indexOf("street_number") !== -1));
  if (typeof strNumber !== 'undefined') {
    strNumber = strNumber.long_name;
  }
  var route = _.find(result.address_components, (elt) => (elt.types.indexOf("route") !== -1));
  if (typeof route !== 'undefined') {
    route = route.long_name;
  }
  if (typeof strNumber !== 'undefined') {
    route = _.join([strNumber, route], ' ');
  }
  if (addressData.address == '') {
    addressData.address = route || '';
  } else {
    addressData.address2 = route || '';
  }

  //City
  var city = _.find(result.address_components, (elt) => (elt.types.indexOf("locality") !== -1));
  if (typeof city !== 'undefined') {
    city = city.long_name;
  }
  addressData.city = city || '';

  //County/State
  var state = _.find(result.address_components, (elt) => (elt.types.indexOf("administrative_area_level_2") !== -1));
  var region = _.find(result.address_components, (elt) => (elt.types.indexOf("region") !== -1));

  if (typeof state !== 'undefined') {
    state = state.long_name;
  } else if (typeof region !== 'undefined') {
    state = region.long_name;
  }

  addressData.county = state || '';

  //Country
  var country = _.find(result.address_components, (elt) => (elt.types.indexOf("country") !== -1));
  if (typeof country !== 'undefined') {
    country = country.long_name;
  }
  addressData.country = country || '';

  //Postcode
  var postalCode = _.find(result.address_components, (elt) => (elt.types.indexOf("postal_code") !== -1));
  if (typeof postalCode !== 'undefined') {
    postalCode = postalCode.long_name;
  }
  addressData.postcode = postalCode || '';

  //Lat and Lng
  if (typeof result.geometry.location.lat() !== 'undefined' && typeof result.geometry.location.lat() !== 'undefined') {
    addressData.lat = result.geometry.location.lat();
    addressData.lng = result.geometry.location.lng();
  }
  return addressData;
};

//Converts result from Clearbit API call to RT's address format
const getAddressFromLookup = (geo) => {
  var addressData = {};
  //Generate values for addressData.address and addressData.address2
  if (geo.subPremise) {
    addressData.address = geo.subPremise;
    if (geo.streetName && geo.streetNumber) {
      addressData.address2 = _.join([geo.streetNumber, geo.streetName], ' ');
    } else if (geo.streetName && !geo.streetNumber) {
      addressData.address2 = geo.streetName;
    }
  } else {
    if (geo.streetName && geo.streetNumber) {
      addressData.address = _.join([geo.streetNumber, geo.streetName], ' ');
    } else if (geo.streetName && !geo.streetNumber) {
      addressData.address = geo.streetName;
    }
  }

  if (geo.city) {
    addressData.city = geo.city;
  }
  if (geo.state) {
    addressData.county = geo.state;
  }
  if (geo.country) {
    addressData.country = geo.country;
  }
  if (geo.postalCode) {
    addressData.postcode = geo.postalCode;
  }
  if (geo.lat) {
    addressData.lat = geo.lat;
  }
  if (geo.lng) {
    addressData.lng = geo.lng;
  }
  return addressData;
};

export { getAddressFromLookup, getAddressFromGoogleMapsSearch };