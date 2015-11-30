Template.adminTutorialEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.adminTutorialEnd.events({
  "click #close-tour-end": function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
  },
  "click #add-contact": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  "click #add-company": function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  "click #retake": function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  }
});
