var mapData = null;
var loadSwitch = false;

Template.map.helpers({
  mapOptions: function() {
    mapData = this.data;

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
})

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
  if(mapData !== null && mapData.title !== undefined) {
    mapData.name = mapData.title + ' ' + mapData.forename + ' ' + mapData.surname;
  }
    if (loadSwitch === false && mapData.address !== undefined) {
      var infowindow = new google.maps.InfoWindow();
      if(mapData.lat !== undefined && mapData.lng !== undefined) {
        var location = {
              lat: parseFloat(mapData.lat),
              lng: parseFloat(mapData.lng)
            }
        var marker = new google.maps.Marker( {
          map: map.instance,
          position: location,
          title: mapData.name
        });
        marker.setMap(map.instance);
        infowindow.setContent(mapData.name);
        infowindow.open(map.instance, marker);
        map.instance.panTo(location);
        map.instance.setZoom(16);
        loadSwitch = true;
      }else {
        var gc = new google.maps.Geocoder();
        gc.geocode({
          'address': mapData.address + mapData.postcode + mapData.city + mapData.country
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            pin = results[0].geometry.location;
            if (pin !== null) {
              var marker = new google.maps.Marker( {
                map: map.instance,
                position: pin,
                title: mapData.name
              });
              marker.setMap(map.instance);
              infowindow.setContent(mapData.name);
              infowindow.open(map.instance, marker);
              map.instance.panTo(pin);
              map.instance.setZoom(16);
              loadSwitch = true;
            }
          }
        });
      }
    }
  });

});
