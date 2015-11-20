Template.tourEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.tourEnd.events({
  "click #close-tour-end": function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
  }
});
