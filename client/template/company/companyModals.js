Template.insertNewCompanyModal.onCreated(function() {
  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.insertNewCompanyModal.onRendered(function () {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  this.autorun(function () {
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete({
        details: "#insertNewCompanyForm",
        detailsAttribute: "data-geo"
      }).bind("geocode:result", function(event, result) {
        $("#address_details").show();
      }).bind("geocode:error", function(event, result) {
        $("#address_details").show();
      });
    }
  });
});