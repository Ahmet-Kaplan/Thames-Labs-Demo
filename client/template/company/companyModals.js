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
        if(Meteor.Device.isDesktop()) {
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
        }
      }).bind("geocode:error", function(event) {
        $("#address_details").show();
      });
    }
  });
});