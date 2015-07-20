companyData = null;
loadSwitch = false;

Template.map.helpers({
  mapOptions: function() {
    companyData = this.data;

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

    // google.maps.event.addListener(map.instance, 'idle', function(event) {

    if (loadSwitch === false) {

      gc = new google.maps.Geocoder();
      gc.geocode({
        'address': companyData.postcode
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          pin = results[0].geometry.location;

          if (pin !== null) {
            var point = new google.maps.LatLng(pin.A, pin.F);

            map.instance.panTo(point);
            map.instance.setZoom(16);

            loadSwitch = true;
          }
        }
      });

    }

    // });


  });

});
