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
    opacity: 0.35
  });

  this.autorun(function () {
    if(GoogleMaps.loaded()) {
      $("#geo").geocomplete()
      .bind("geocode:result", function(event, result) {
        console.log("Result: " + result.formatted_address);
      });
    }
  });
});