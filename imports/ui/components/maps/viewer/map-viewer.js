import './map-viewer.css';
import './map-viewer.html';

Template.mapViewer.onCreated(function() {
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey
  });

  this.updateMap = (map, title, address) => {
    var newPosition = new google.maps.LatLng(address.lat, address.lng);
    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: newPosition,
        map: map
      });
    } else {
      this.marker.setPosition(newPosition);
      this.marker.setMap(map);
    }

    if (!this.infowindow) {
      this.infowindow = new google.maps.InfoWindow();
    }
    this.infowindow.open(map, this.marker);
    this.infowindow.setContent(title);

    map.setCenter(this.marker.getPosition());
    map.setZoom(14);
  };
});

Template.mapViewer.onRendered(function() {

  GoogleMaps.ready('map', (map) => {
    this.autorun(() => {
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
        geocoder.geocode({
          'address': [address.address, address.postcode, address.city, address.county, address.country].join(', ')
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            address.lat = location.lat();
            address.lng = location.lng();
          } else {
            address.lat = 0;
            address.lng = 0;
            title = "Location not found";
          }
          this.updateMap(map.instance, title, address);
        });
      } else {
        // Location already known so no need to geocode
        this.updateMap(map.instance, title, address);
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