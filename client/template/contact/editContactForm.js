Template.editContactModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.editContactModal.onRendered(function() {
  if(this.data.companyId === undefined) {
    $('#addressWrapper').show();
  }

  this.autorun(function() {
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#editContactForm",
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
      }).keypress(function(event) {
        if(event.keyCode == 13) {
          $("#address_details").show();
        }
      });
    }
  });
});

Template.editContactModal.helpers({
  noCompany: function() {
    return this.companyId === undefined;
  }
});

Template.editContactModal.events({
  'click #show-map': function() {
    $("#show-map").hide();
    var mapData = this;
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
    if(mapData !== null && mapData.title !== undefined) {
      mapData.name = mapData.title + ' ' + mapData.forename + ' ' + mapData.surname;
    }
    //Set map to the current location
    var infowindow = new google.maps.InfoWindow();
    if(mapData.lat !== undefined && mapData.lng !== undefined) {
      location = {
            lat: parseFloat(mapData.lat),
            lng: parseFloat(mapData.lng)
          }
      mapModal.panTo(location);
      mapModal.setZoom(16);
      var markerModal = new google.maps.Marker( {
        map: mapModal,
        position: location,
        title: mapData.name,
        draggable: true
      });
      markerModal.setMap(mapModal);
      google.maps.event.addListener(markerModal, "dragend", function(event) {
        $("input[name=lat]").val(markerModal.getPosition().G);
        $("input[name=lng]").val(markerModal.getPosition().K);
      });
      var infowindow = new google.maps.InfoWindow();
      infowindow.setContent(mapData.name);
      infowindow.open(mapModal, markerModal);
    }else {
      var gc = new google.maps.Geocoder();
      gc.geocode({
          'address': mapData.address + mapData.postcode + mapData.city + mapData.country
        }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          location = {
            lat: results[0].geometry.location.G,
            lng: results[0].geometry.location.K
          };
          mapModal.panTo(location);
          mapModal.setZoom(16);
          var markerModal = new google.maps.Marker( {
            map: mapModal,
            position: location,
            title: mapData.name,
            draggable: true
          });
          markerModal.setMap(mapModal);
          google.maps.event.addListener(markerModal, "dragend", function(event) {
            $("input[name=lat]").val(markerModal.getPosition().G);
            $("input[name=lng]").val(markerModal.getPosition().K);
          });
          var infowindow = new google.maps.InfoWindow();
          infowindow.setContent(mapData.name);
          infowindow.open(mapModal, markerModal);
        }
      });
    }
  }
});
