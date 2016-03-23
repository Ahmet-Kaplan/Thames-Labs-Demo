Template.insertNewCompanyModal.onCreated(function() {
  this.magicList = new ReactiveVar([]);
  this.fetchingResults = new ReactiveVar(false);
  this.showDetails = new ReactiveVar(false);
  this.showResultsList = new ReactiveVar(false);
  this.companyData = new ReactiveVar({});
  this.showDuplicationWarning = new ReactiveVar(false);
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.insertNewCompanyModal.onRendered(function() {
  this.triggerMagicSearch = _.debounce(() => {
    var searchInput = $('#companyName').val().trim();

    if(!searchInput) {
      this.fetchingResults.set(false);
      return;
    }

    Meteor.call('clearbit.getCompanyFromNameOrWebsite', searchInput, (err, results) => {
      if(results) {
        this.magicList.set(results);
      }
      this.showResultsList.set(true)
      this.fetchingResults.set(false);
    });
  }, 500);

});

Template.insertNewCompanyModal.helpers({
  resultsList: function() {
    return Template.instance().magicList.get().results;
  },
  resultsTotal: function() {
    return Template.instance().magicList.get().total;
  },
  fetchingResults: function() {
    return Template.instance().fetchingResults.get();
  },
  showDetails: function() {
    return Template.instance().showDetails.get();
  },
  showResultsList: function() {
    return Template.instance().showResultsList.get();
  },
  companyData: function() {
    return Template.instance().companyData.get();
  },
  showDuplicationWarning: function() {
    return Template.instance().showDuplicationWarning.get();
  }
});

Template.insertNewCompanyModal.events({
  'click #close': function() {
    hopscotch.endTour(true);
  },
  'keyup #companyName': function(evt) {
    evt.preventDefault();
    //Flush on Enter
    if(evt.keyCode === 13) {
      Template.instance().triggerMagicSearch();
      Template.instance().triggerMagicSearch.flush;
    //Only trigger search if key is a number, letter OR backspace, dash/minus, dot/point, slash
    } else if((evt.keyCode > 47 && evt.keyCode < 91) || [8, 109, 110, 189, 190, 191].indexOf(evt.keyCode) !== -1) {
      if($(evt.target).val().trim() !== '') {
        Template.instance().fetchingResults.set(true);
      } else {
        Template.instance().fetchingResults.set(false);
      }
      Template.instance().triggerMagicSearch.cancel;
      Template.instance().triggerMagicSearch();
    }
    //Handle duplication warning message
    var name = $('#companyName').val();
    var templateInstance = Template.instance();
    Meteor.call('company.checkExistsByName', name, (err, res) => {
      templateInstance.showDuplicationWarning.set(res === true);
    });
  },
  'click .magic-result': function(evt) {
    evt.preventDefault();
    var resultId = evt.target.id;
    var result = _.find(Template.instance().magicList.get().results, {id: resultId});
    Template.instance().companyData.set(result);
    Template.instance().showDetails.set(true);
  },
  'click #manual-fill': function(evt) {
    evt.preventDefault();
    Template.instance().companyData.set({
      name: $('#companyName').val()
    });
    Template.instance().showDetails.set(true);
  }
});

Template.companyFormDetails.onCreated(function() {
  this.showMap = new ReactiveVar(false);
  this.showAddressDetails = new ReactiveVar(false);
  this.showLocationSearch = new ReactiveVar(true);
  //Using ReactiveVar for company data to be able to update them dynamically
  this.companyData = new ReactiveVar(this.data.companyData);
})

Template.companyFormDetails.onRendered(function() {
  //Updates companyData if update on parent template
  this.autorun(() => {
    var companyData = Template.currentData().companyData;
    this.companyData.set(companyData);
  });

  //Run the geocode search handler and return data into the companyData reactive var
  this.autorun(() => {
    if (GoogleMaps.loaded() && $('#geo').length > 0) {
      $("#geo").geocomplete({
        details: "#insertNewCompanyForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", (event, result) => {
        var companyData = this.companyData.get();
        if(!companyData.geo) {
          companyData.geo = {};
        }

        //Street Number
        var strNumber = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("street_number") !== -1;
        });

        if (typeof strNumber !== 'undefined') {
          strNumber = strNumber.long_name;
          companyData.geo.streetNumber = strNumber;
        }

        //Street Name
        var route = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("route") !== -1;
        });

        if (typeof route !== 'undefined') {
          route = route.long_name;
          companyData.geo.streetName = route;
        }

        //City
        var city = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("locality") !== -1;
        });

        if (typeof city !== 'undefined') {
          city = city.long_name;
          companyData.geo.city = city;
        }

        //County/State
        var state = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("administrative_area_level_2") !== -1;
        });

        if (typeof state !== 'undefined') {
          state = state.long_name;
          companyData.geo.state = state;
        }

        //Country
        var country = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("country") !== -1;
        });

        if (typeof country !== 'undefined') {
          country = country.long_name;
          companyData.geo.country = country;
        }

        //Postcode
        var postalCode = _.find(result.address_components, (elt) => {
          return elt.types.indexOf("postal_code") !== -1;
        });

        if (typeof postalCode !== 'undefined') {
          postalCode = postalCode.long_name;
          companyData.geo.postalCode = postalCode;
        }

        //Lat and Lng
        var lat = result.geometry.location.lat();
        var lng = result.geometry.location.lng();

        if (typeof lat !== 'undefined' && typeof lng !== 'undefined') {
          companyData.geo.lat = lat;
          companyData.geo.lng = lng;
        }

        this.companyData.set(companyData);
        this.showAddressDetails.set(true);
        this.showLocationSearch.set(false);
      }).keypress((event) => {
        if (event.which == 13) {
          this.showAddressDetails.set(true);
        }
      });
    }
  });

  //Autorun that display address details and map if data exist
  this.autorun(() => {
    var companyData = this.companyData.get()
    if(!companyData.geo) {
      this.showAddressDetails.set(false);
      this.showLocationSearch.set(true);
    } else if(companyData.geo != {}) {
      this.showAddressDetails.set(true);
      this.showLocationSearch.set(false);
    }
    //If lat and lng available, display on map, otherwise trigger search using data provided
    if(GoogleMaps.loaded() && companyData.geo && companyData.geo.lat && companyData.geo.lng) {
      this.showMap.set(true);
    } else {
      var searchString = [];
      searchString.push(companyData.streetNumber || '');
      searchString.push(companyData.streetName || '');
      searchString.push(companyData.city || '');
      searchString.push(companyData.state || '');
      searchString.push(companyData.postalCode || '');
      searchString.push(companyData.country || '');

      if(searchString.join(' ').trim() !== '') {
        this.showMap.set(true);
        $('#geo').val(searchString);
        $('#geo').trigger('geocode');
      } else {
        this.showMap.set(false);
      }
    }
  });
});

Template.companyFormDetails.helpers({
  companyName: function() {
    return Template.instance().companyData.get().name || '';
  },
  website: function() {
    return Template.instance().companyData.get().url || '';
  },
  showAddressDetails: function() {
    return Template.instance().showAddressDetails.get();
  },
  formattedAddress: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.streetName) {
      var number = (Template.instance().companyData.get().geo.streetNumber) ? Template.instance().companyData.get().geo.streetNumber + ' ' : '';
      var name = (Template.instance().companyData.get().geo.streetName) ? Template.instance().companyData.get().geo.streetName : '';
      return number + name;
    } else {
      return '';
    }
  },
  city: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.city) {
      return Template.instance().companyData.get().geo.city;
    } else {
      return '';
    }
  },
  county: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.state) {
      return Template.instance().companyData.get().geo.state;
    } else {
      return '';
    }
  },
  postcode: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.postalCode) {
      return Template.instance().companyData.get().geo.postalCode;
    } else {
      return '';
    }
  },
  country: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.country) {
      return Template.instance().companyData.get().geo.country;
    } else {
      return '';
    }
  },
  lat: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.lat) {
      return Template.instance().companyData.get().geo.lat;
    } else {
      return '';
    }
  },
  lng: function() {
    if(Template.instance().companyData.get().geo && Template.instance().companyData.get().geo.lng) {
      return Template.instance().companyData.get().geo.lng;
    } else {
      return '';
    }
  },
  phone: function() {
    return Template.instance().companyData.get().phone;
  },
  showMap: function() {
    return Template.instance().showMap.get();
  },
  showLocationSearch: function() {
    return Template.instance().showLocationSearch.get();
  }
});

Template.companyFormDetails.events({
  'click #newLocationSearch': function(event) {
    event.preventDefault();
    Template.instance().showLocationSearch.set(true);
    $('#geo').val('');
  }
})

Template.mapPicker.onRendered(function() {
  this.autorun(() => {
    if(Template.currentData().lat && Template.currentData().lng) {
      var location = {
        lat: Template.currentData().lat,
        lng: Template.currentData().lng
      }
      $("#map_canvas").height("400px");
      var map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 16,
        center: location,
        scrollwheel: false
      });
      var marker = new google.maps.Marker({
        map: map,
        position: location,
        draggable: true
      });
      google.maps.event.addListener(marker, "dragend", function(event) {
        $("input[name=lat]").val(marker.getPosition().lat());
        $("input[name=lng]").val(marker.getPosition().lng());
      });
    }
  })
})
