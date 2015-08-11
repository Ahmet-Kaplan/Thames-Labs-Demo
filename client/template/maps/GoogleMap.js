mapData = null;
loadSwitch = false;

Template.map.helpers({
  mapOptions: function() {

    var options = {
      zoom: 8,
      center: {
        lat: 52.234744,
        lng: 0.153752
      }
    };

    return options;
  }
});

Template.map.onDestroyed(function() {
  loadSwitch = false;
});

function updateMap(map, mapData) {
  var marker = new google.maps.Marker( {
        map: map,
        position: mapData.coordinates,
        title: mapData.name
  });
  var infowindow = new google.maps.InfoWindow();
  marker.setMap(map);
  infowindow.setContent(mapData.name);
  infowindow.open(map, marker);
  map.panTo(mapData.coordinates);
  map.setZoom(16);
}

Template.map.onCreated(function() {
  GoogleMaps.load({
      libraries: 'places'
    });

  var self = this;

  GoogleMaps.ready('map', function(map) {
    self.autorun(function() {
      var mapData = self.data.data;
      if(mapData.coordinates) {
        updateMap(map.instance, mapData);
      } else {
        var gc = new google.maps.Geocoder();
        gc.geocode({
          'address': mapData.address
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            mapData.coordinates = {
              lat: results[0].geometry.location.G,
              lng: results[0].geometry.location.K
            }
            updateMap(map.instance, mapData);
          }
        });
      }
    });
  });

});

