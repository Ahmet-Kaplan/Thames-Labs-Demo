Template.insertNewCompanyModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.insertNewCompanyModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

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
        $("#address_details").show();
        $("#map_wrapper").show();
        $("#map_canvas").height("400px");
        // updateMap(result.geometry.location);
        var map = new google.maps.Map(document.getElementById("map_canvas"), {
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
          $("input[name=lat]").val(marker.getPosition().G);
          $("input[name=lng]").val(marker.getPosition().K);
        });
      }).bind("geocode:error", function(event) {
        $("#address_details").show();
      });
    }
  });
});

Template.editCompanyModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.editCompanyModal.onRendered(function() {
});

function geoSearch() {
    //Enable search
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#editCompanyForm",
        detailsAttribute: "data-geo"
      })
      .bind("geocode:result", function(event, result) {
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
        map.panTo(result.geometry.location);
        marker.setPosition(result.geometry.location);
      });
    }
}

Template.editCompanyModal.events({
  'click #show-map': function() {
    $("#show-map").hide();
    var companyData = this;
    $("#map_wrapper").show();
    $("#mapModal_canvas").height("400px");
    var map = new google.maps.Map(document.getElementById("mapModal_canvas"), {
      zoom: 10,
      center: {
        lat: 52.234744,
        lng: 0.153752
      },
      scrollwheel: false
    });

    //Set map to the current location
    var infowindow = new google.maps.InfoWindow();
    if(companyData.lat !== undefined && companyData.lng !== undefined) {
      var location = {
            lat: parseFloat(companyData.lat),
            lng: parseFloat(companyData.lng)
          }
      var marker = new google.maps.Marker( {
        map: map,
        position: location,
        title: companyData.name,
        draggable: true
      });
      marker.setMap(map);
      infowindow.setContent(companyData.name);
      infowindow.open(map, marker);
      map.panTo(location);
      map.setZoom(16);
    }else {
      var gc = new google.maps.Geocoder();
      gc.geocode({
        'address': companyData.address + companyData.postcode + companyData.city + companyData.country
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var pin = results[0].geometry.location;
          if (pin !== null) {
            var marker = new google.maps.Marker( {
              map: map,
              position: pin,
              title: companyData.name,
              draggable: true
            });
            marker.setMap(map);
            infowindow.setContent(companyData.name);
            infowindow.open(map, marker);
            map.panTo(pin);
            map.setZoom(16);
            loadSwitch = true;
          }
        }
      });
    }
    google.maps.event.addListener(marker, "dragend", function(event) {
      $("input[name=lat]").val(marker.getPosition().G);
      $("input[name=lng]").val(marker.getPosition().K);
    });
    geoSearch();
  }
});
