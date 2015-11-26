Template.tourEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.tourEnd.events({
  "click #close-tour-end": function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
  },
  "click #add-company": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  "click #add-contact": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  "click #retake": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  }
});
