Template.insertNewCompanyModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

function showAddressDetails(location) {
  console.log(location)
  $("#address_details").show();
  $("#map_wrapper").show();
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

Template.insertNewCompanyModal.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#insertNewCompanyForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", function(event, result) {
        var address = "";
        var strNumber = _.find(result.address_components, function(elt) {
          return elt.types[0] == "street_number";
        });

        if(typeof(strNumber) !== 'undefined') {
          strNumber = strNumber.long_name;
          address += strNumber + " ";
        }

        var route = _.find(result.address_components, function(elt) {
          return elt.types[0] == "route";
        });

        if(typeof(route) !== 'undefined') {
          route = route.long_name;
          address += route;
        }
        $("#formatted_address").val(address);
        showAddressDetails(result.geometry.location);
      }).keypress(function(event) {
        if(event.which == 13) {
          $("#address_details").show();
        }
      });
    }
  });

});

Template.insertNewCompanyModal.events({
  'click #magic-fill': function(evt) {
    evt.preventDefault();
    Meteor.call('clearbit.getCompanyAutoFill', $('input[name=website]').val(), function(err, res) {
      console.log(err, res);
      if(res.name) {
        $('input[name=name]').val(res.name);
      } else {
        toastr.info('No results were found for this website');
      }
      if(res.geo) {
        var geo = res.geo;
        var searchString = '';
        if(geo.streetNumber && geo.streetName){
          $('input[name=address]').val(geo.streetNumber + ' ' + geo.streetName);
          searchString += geo.streetNumber + ' ' + geo.streetName;
        }
        if(geo.city){
          $('input[name=city]').val(geo.city);
          searchString += ' ' + geo.city;
        }
        if(geo.state){
          $('input[name=county]').val(geo.state);
        }
        if(geo.postalCode){
          $('input[name=postcode]').val(geo.postalCode);
          searchString += ' ' + geo.postalCode;
        }
        if(geo.country){
          $('input[name=country]').val(geo.country);
          searchString += ' ' + geo.country;
        }
        if(geo.lat && geo.lng) {
          $('input[name=lat]').val(geo.lat);
          $('input[name=lng]').val(geo.lng);
          showAddressDetails({
            lat: geo.lat,
            lng: geo.lng
          });
        } else if(searchString !== '') {
          $('#geo').val(searchString);
          $('#geo').trigger('geocode');
        }
      }
      if(res.phone) {
        $('input[name=phone]').val(res.phone);
      }
    });
  }
})

Template.editCompanyModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.editCompanyModal.onRendered(function() {
  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#editCompanyForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", function(event, result) {
        var address = "";
        var strNumber = _.find(result.address_components, function(elt) {
          return elt.types[0] == "street_number";
        });

        if(typeof(strNumber) !== 'undefined') {
          strNumber = strNumber.long_name;
          address += strNumber + " ";
        }

        var route = _.find(result.address_components, function(elt) {
          return elt.types[0] == "route";
        });

        if(typeof(route) !== 'undefined') {
          route = route.long_name;
          address += route;
        }
        $("#formatted_address").val(address);
        $("#mapModal_canvas").empty();
        var map = new google.maps.Map(document.getElementById("mapModal_canvas"), {
          zoom: 16,
          center: result.geometry.location,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
          map: map,
          position: result.geometry.location,
          draggable: true
        });
        google.maps.event.addListener(marker, "dragend", function(event) {
          $("input[name=lat]").val(marker.getPosition().lat());
          $("input[name=lng]").val(marker.getPosition().lng());
        });
      }).keypress(function(event) {
        if(event.keyCode == 13) {
          $("#address_details").show();
        }
      });
    }
  });

});

Template.editCompanyModal.events({
  'click #show-map': function() {
    $("#show-map").hide();
    var companyData = this;
    $("#map_wrapper").show();
    $("#mapModal_canvas").height("400px");
    var location = {
        lat: 52.234744,
        lng: 0.153752
      };
    var mapModal = new google.maps.Map(document.getElementById("mapModal_canvas"), {
      zoom: 10,
      center: location,
      scrollwheel: false
    });
    //Set map to the current location
    var infowindow = new google.maps.InfoWindow();
    if(companyData.lat !== undefined && companyData.lng !== undefined) {
      location = {
            lat: parseFloat(companyData.lat),
            lng: parseFloat(companyData.lng)
          }
      mapModal.panTo(location);
      mapModal.setZoom(16);
      var markerModal = new google.maps.Marker( {
        map: mapModal,
        position: location,
        title: companyData.name,
        draggable: true
      });
      markerModal.setMap(mapModal);
      google.maps.event.addListener(markerModal, "dragend", function(event) {
        $("input[name=lat]").val(markerModal.getPosition().lat());
        $("input[name=lng]").val(markerModal.getPosition().lng());
      });
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(companyData.name);
      infowindow.open(mapModal, markerModal);
    }else {
      var gc = new google.maps.Geocoder();
      gc.geocode({
          'address': companyData.address + companyData.postcode + companyData.city + companyData.country
        }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          mapModal.panTo(location);
          mapModal.setZoom(16);
          var markerModal = new google.maps.Marker( {
            map: mapModal,
            position: location,
            title: companyData.name,
            draggable: true
          });
          markerModal.setMap(mapModal);
          google.maps.event.addListener(markerModal, "dragend", function(event) {
            $("input[name=lat]").val(markerModal.getPosition().lat());
            $("input[name=lng]").val(markerModal.getPosition().lng());
          });
          var infowindow = new google.maps.InfoWindow();
          infowindow.setContent(companyData.name);
          infowindow.open(mapModal, markerModal);
        }
      });
    }
  }
});
