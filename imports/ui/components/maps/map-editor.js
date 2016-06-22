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
      var location = {
        lat: addressData.lat,
        lng: addressData.lng
      };
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
      google.maps.event.addListener(marker, "dragend", function(event) {
        $("input[name=lat]").val(marker.getPosition().lat());
        $("input[name=lng]").val(marker.getPosition().lng());
      });
    } else {
      // Geocode if location not explicitly set
      var self = this;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': [addressData.address, addressData.postcode, addressData.city, addressData.country].join(', ')
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var loc = results[0].geometry.location;
          addressData.lat = loc.lat();
          addressData.lng = loc.lng();
          self.data.address.set(addressData);
        } else {
          addressData.lat = 0;
          addressData.lng = 0;
          title = "Location not found";
        }
      });
    }
  });
});