AutoForm.hooks({
  editCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      var companyData = this.updateDoc.$set;
      var location = 0;
      $("#map-wrapper").empty();
      $("#map-wrapper").height("400px");
      var map = new google.maps.Map(document.getElementById("map-wrapper"), {
        center: {lat: 52.234744, lng: 0.153752},
        scrollwheel: false,
        zoom: 10
      });
      if(companyData.lat !== undefined && companyData.lng !== undefined) {
        location = {
              lat: parseFloat(companyData.lat),
              lng: parseFloat(companyData.lng)
            };
        map.panTo(location);
        map.setZoom(16);
        var marker = new google.maps.Marker( {
          map: map,
          position: location,
          title: companyData.name
        });
        marker.setMap(map);
        var infowindow = new google.maps.InfoWindow();
        infowindow.setContent(companyData.name);
        infowindow.open(map, marker);
      }else {
        var gc = new google.maps.Geocoder();
        gc.geocode({
            'address': companyData.address + companyData.postcode + companyData.city + companyData.country
          }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            location = {
              lat: results[0].geometry.location.G,
              lng: results[0].geometry.location.K
            };
            map.panTo(location);
            map.setZoom(16);
            var marker = new google.maps.Marker( {
              map: map,
              position: location,
              title: companyData.name
            });
            marker.setMap(map);
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent(companyData.name);
            infowindow.open(map, marker);
          }
        });
      }
      toastr.success('Company details updated.');
    }
  }
});

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
      }).keypress(function(event) {
        if(event.which == 13) {
          $("#address_details").show();
        }
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
          $("input[name=lat]").val(marker.getPosition().G);
          $("input[name=lng]").val(marker.getPosition().K);
        });
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
    }else {
      var gc = new google.maps.Geocoder();
      gc.geocode({
          'address': companyData.address + companyData.postcode + companyData.city + companyData.country
        }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          location = results[0].geometry.location;
        }
      });
    }
    if(location !== undefined) {
      var markerModal = new google.maps.Marker( {
        map: mapModal,
        position: location,
        title: companyData.name,
        draggable: true
      });
      markerModal.setMap(mapModal);
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(companyData.name);
      infowindow.open(mapModal, markerModal);
      mapModal.panTo(location);
      mapModal.setZoom(16);
    }
    if(markerModal !== undefined) {
      google.maps.event.addListener(markerModal, "dragend", function(event) {
        $("input[name=lat]").val(markerModal.getPosition().G);
        $("input[name=lng]").val(markerModal.getPosition().K);
      });
    }
  }
});
