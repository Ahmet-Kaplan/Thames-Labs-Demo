Template.adminTutorialEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.adminTutorialEnd.events({
  "click #close-first-run": function(event, template) {
    Modal.hide();
  },
  "click #first-run-tour": function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  "click #companies-tutorial": function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  "click #contacts-tutorial": function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  "click #admin-tutorial": function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  }
});
