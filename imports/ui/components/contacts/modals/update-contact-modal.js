import './update-contact-modal.html';

Template.updateContactModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places',
    key: Meteor.settings.public.googleDeveloperKey
  });
});

Template.updateContactModal.onRendered(function() {
  if (typeof this.data.companyId === "undefined") {
    $('#addressWrapper').show();
  }

  if (Meteor.user()) {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      let options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          };
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }

  this.autorun(function() {
    if (GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#editContactForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", function(event, result) {
        let address = "",
            strNumber = _.find(result.address_components, function(elt) {
              return elt.types[0] == "street_number";
            });

        if (typeof strNumber !== 'undefined') {
          strNumber = strNumber.long_name;
          address += strNumber + " ";
        }

        let route = _.find(result.address_components, function(elt) {
          return elt.types[0] == "route";
        });

        if (typeof route !== 'undefined') {
          route = route.long_name;
          address += route;
        }
        $("#formatted_address").val(address);
        $("#mapModal_canvas").empty();
        const map = new google.maps.Map(document.getElementById("mapModal_canvas"), {
                zoom: 16,
                center: result.geometry.location,
                scrollwheel: false
              }),
              marker = new google.maps.Marker({
                map: map,
                position: result.geometry.location,
                draggable: true
              });
        google.maps.event.addListener(marker, "dragend", function() {
          $("input[name=lat]").val(marker.getPosition().lng());
          $("input[name=lng]").val(marker.getPosition().lat());
        });
      }).keypress(function(event) {
        if (event.keyCode == 13) {
          $("#address_details").show();
        }
      });
    }
  });
});

Template.updateContactModal.helpers({
  noCompany: function() {
    return typeof this.companyId === "undefined";
  },
  showTitleField: function() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  }
});

Template.updateContactModal.events({
  'click #show-map': function() {
    $("#show-map").hide();
    $("#map_wrapper").show();
    $("#mapModal_canvas").height("400px");
    let location = {
      lat: 52.234744,
      lng: 0.153752
    };
    const mapData = this,
          mapModal = new google.maps.Map(document.getElementById("mapModal_canvas"), {
            zoom: 10,
            center: location,
            scrollwheel: false
          });

    if (mapData !== null && typeof mapData.title !== "undefined") {
      mapData.title = mapData.forename + ' ' + mapData.surname;
    } else {
      mapData.title = mapData.forename + ' ' + mapData.surname;
    }
    //Set map to the current location
    if (typeof mapData.lat !== "undefined" && typeof mapData.lng !== "undefined") {
      location = {
        lat: parseFloat(mapData.lat),
        lng: parseFloat(mapData.lng)
      };
      mapModal.panTo(location);
      mapModal.setZoom(16);

      const markerModal = new google.maps.Marker({
        map: mapModal,
        position: location,
        title: mapData.title,
        draggable: true
      });
      markerModal.setMap(mapModal);
      google.maps.event.addListener(markerModal, "dragend", function(event) {
        $("input[name=lat]").val(markerModal.getPosition().lat());
        $("input[name=lng]").val(markerModal.getPosition().lng());
      });
      const infowindow = new google.maps.InfoWindow();
      infowindow.setContent(mapData.title);
      infowindow.open(mapModal, markerModal);
    } else {
      const gc = new google.maps.Geocoder();
      gc.geocode({
        'address': mapData.address + mapData.postcode + mapData.city + mapData.country
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          mapModal.panTo(location);
          mapModal.setZoom(16);

          const markerModal = new google.maps.Marker({
            map: mapModal,
            position: location,
            title: mapData.title,
            draggable: true
          });
          markerModal.setMap(mapModal);
          google.maps.event.addListener(markerModal, "dragend", function(event) {
            $("input[name=lat]").val(markerModal.getPosition().lat());
            $("input[name=lng]").val(markerModal.getPosition().lng());
          });
          const infowindow = new google.maps.InfoWindow();
          infowindow.setContent(mapData.title);
          infowindow.open(mapModal, markerModal);
        }
      });
    }
  }
});

AutoForm.hooks({
  updateContactForm: {
    before: {
      update: function(doc) {
        var oldValues = this.currentDoc,
            modifications = true;
        $.each(['address', 'address2', 'city', 'country', 'county', 'postcode'], function(i, field) {
          modifications = (oldValues[field] === doc.$set[field]);
          return modifications;
        });
        if (!modifications) {
          doc.$set.lat = '';
          doc.$set.lng = '';
        }
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact details updated.');
    },
    onError: function(formType, error) {
      toastr.error('Contact update error: ' + error);
    }
  }
});