Template.tourEnd.onRendered(function() {
  hopscotch.endTour(true);
});

Template.tourEnd.events({
  'click #close-first-run': function(event, template) {
    Modal.hide();
  },
  'click #first-run-tour': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    FlowRouter.go('dashboard');
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  'click #companies-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    FlowRouter.go('dashboard');
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  'click #contacts-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    FlowRouter.go('dashboard');
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  'click #admin-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    FlowRouter.go('dashboard');
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  }
});
