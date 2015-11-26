Template.companyTutorialEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.companyTutorialEnd.events({
  "click #close-tour-end": function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
  },
  "click #add-contact": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  "click #retake": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  }
});
