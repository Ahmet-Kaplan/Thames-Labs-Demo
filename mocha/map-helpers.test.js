//**Need to move this file to imports/ui/components/maps after Meteor upgrade**
import { assert } from 'meteor/practicalmeteor:chai';

import { getAddressFromLookup, getAddressFromGoogleMapsSearch } from '../imports/ui/components/maps/map-helpers.js';

describe("map helpers", () => {

  it("return an address from a google.maps.places.PlaceResult object", function() {
    //Note: some unnecessary response fields ommited for clarity.
    const googleResponse = {
      "address_components": [
        {
          "long_name": "Saint John's Innovation Centre",
          "short_name": "St John's Innovation Centre",
          "types": ["premise"]
        }, {
          "long_name": "Cowley Road",
          "short_name": "Cowley Rd",
          "types": ["route"]
        }, {
          "long_name": "Milton",
          "short_name": "Milton",
          "types": ["locality", "political"]
        }, {
          "long_name": "Cambridge",
          "short_name": "Cambridge",
          "types": ["postal_town"]
        }, {
          "long_name": "Cambridgeshire",
          "short_name": "Cambridgeshire",
          "types": ["administrative_area_level_2", "political"]
        }, {
          "long_name": "United Kingdom",
          "short_name": "GB",
          "types": ["country", "political"]
        }, {
          "long_name": "CB4 0WS",
          "short_name": "CB4 0WS",
          "types": ["postal_code"]
        }
      ],
      "geometry": {
        "location": {
          "lat": function() {
            return 52.23508229999999;
          },
          "lng": function() {
            return 0.15374210000004496;
          },
        }
      }
    };

    const actualResult = getAddressFromGoogleMapsSearch(googleResponse);

    const expectedResult = {
      "address": "Saint John's Innovation Centre",
      "address2": "Cowley Road",
      "city": "Milton",
      "county": "Cambridgeshire",
      "country": "United Kingdom",
      "postcode": "CB4 0WS",
      "lat": 52.23508229999999,
      "lng": 0.15374210000004496
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("return an address from a clearbit.CompanyApiResponse.geo object", function() {
    //Note: some unnecessary response fields ommited for clarity.
    const clearbitResponse = {
      "name": "Uber",
      "legalName": "Uber, Inc.",
      "domain": "uber.com",
      "url": "http://uber.com",
      "location": "1455 Market Street, San Francisco, CA 94103, USA",
      "timeZone": "America/Los_Angeles",
      "geo": {
        "streetNumber": "1455",
        "streetName": "Market Street",
        "subPremise": null,
        "city": "San Francisco",
        "state": "California",
        "stateCode": "CA",
        "postalCode": "94103",
        "country": "United States",
        "countryCode": "US",
        "lat": 37.7752315,
        "lng": -122.4175567
      },
    };

    const actualResult = getAddressFromLookup(clearbitResponse.geo);
    const expectedResult = {
      "address": "1455 Market Street",
      "city": "San Francisco",
      "county": "California",
      "country": "United States",
      "postcode": "94103",
      "lat": 37.7752315,
      "lng": -122.4175567
    };

    assert.deepEqual(actualResult, expectedResult);
  });

});