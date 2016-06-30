import './map-viewer.css';
import './map-viewer.html';

Template.mapViewer.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey
  });

  const self = this;
  this.updateMap = (map, title, address) => {
    var newPosition = new google.maps.LatLng(address.lat, address.lng);
    if (!self.marker) {
      self.marker = new google.maps.Marker({
        position: newPosition,
        map: map
      });
    } else {
      self.marker.setPosition(newPosition);
      self.marker.setMap(map);
    }

    if (!self.infowindow) {
      self.infowindow = new google.maps.InfoWindow();
    }
    self.infowindow.open(map, self.marker);
    self.infowindow.setContent(title);

    map.setCenter(self.marker.getPosition());
    map.setZoom(14);
  };
});

Template.mapViewer.onRendered(function() {

  var self = this;

  GoogleMaps.ready('map', function(map) {
    const currentInstance = self;
    self.autorun(function() {
      // Reactively get current data context
      // n.b. self.data isn't reactive
      var data = Template.currentData(),
          address = data.address,
          title = data.title;

      if (!address || !title) {
        return;
      }

      // Geocode if location not explicitly set
      var isGeocoded = ('lat' in address && 'lng' in address);
      if (!isGeocoded) {
        var geocoder = new google.maps.Geocoder();
        const instance = currentInstance;
        geocoder.geocode({
          'address': [address.address, address.postcode, address.city, address.county, address.country].join(', ')
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            address.lat = location.lat();
            address.lng = location.lng();
          } else {
            address.lat = 0;
            address.lng = 0;
            title = "Location not found";
          }
          instance.updateMap(map.instance, title, address);
        });
      } else {
        // Location already known so no need to geocode
        currentInstance.updateMap(map.instance, title, address);
      }

    });

  });

});

Template.mapViewer.helpers({
  mapOptions: function() {
    return {
      zoom: 8,
      center: {
        lat: 52.234744,
        lng: 0.153752
      },
      scrollwheel: false
    };
  },
  addressString: function() {
    if (this.address) {
      var address = this.address;
      return encodeURIComponent([
        address.address,
        address.city,
        address.country,
        address.postcode
      ].join(', '));
    }
  }
});