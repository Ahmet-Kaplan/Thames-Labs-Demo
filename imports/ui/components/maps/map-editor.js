import './map-editor.html';

Template.mapEditor.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey,
  });
});

Template.mapEditor.onRendered(function() {
  this.autorun(() => {
    var addressData = Template.currentData().address.get();
    if(addressData.lat && addressData.lng) {
      var location = new google.maps.LatLng(Number(addressData.lat), Number(addressData.lng));
      $("#map_canvas").height("200px");
      var map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 12,
        center: location,
        scrollwheel: false
      });
      var marker = new google.maps.Marker({
        map: map,
        position: location,
        draggable: true
      });

      google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(marker.getPosition());
      });

      google.maps.event.addListener(marker, "dragend", function(event) {
        $("input[name=lat]").val(marker.getPosition().lat());
        $("input[name=lng]").val(marker.getPosition().lng());
      });
    } else {
      // Geocode if location not explicitly set
      var self = this;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': [addressData.address, addressData.address2, addressData.postcode, addressData.city, addressData.country].join(', ')
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var loc = results[0].geometry.location;
          addressData.lat = loc.lat();
          addressData.lng = loc.lng();
          self.data.address.set(addressData);
        } else {
          if (addressData.postcode) {
            geocoder.geocode({
              'address': addressData.postcode
            }, function(res, st) {
              if (st == google.maps.GeocoderStatus.OK) {
                var l = res[0].geometry.location;
                addressData.lat = l.lat();
                addressData.lng = l.lng();
                self.data.address.set(addressData);
              }
            });
          }
        }
      });
    }
  });
});