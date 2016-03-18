Template.firstRun.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.welcomeTour": true
    }
  });
})

Template.firstRun.events({
  'click #close-first-run': function(event, template) {
    Modal.hide();
  },
  'click #first-run-upgrade': function(event, template) {
    FlowRouter.go('administration');
    Modal.hide();
  },
  'click #first-run-tour': function(event, template) {
    Modal.hide();
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  'click #companies-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  'click #contacts-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  'click #admin-tutorial': function(event, template) {
    Modal.hide();
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  },
  'click #home': function(event) {
    FlowRouter.go('dashboard');
    Modal.hide();
  },
  'click #companies': function(event) {
    FlowRouter.go('companies');
    Modal.hide();
  },
  'click #contacts': function(event) {
    FlowRouter.go('contacts');
    Modal.hide();
  },
  'click #admin': function(event) {
    FlowRouter.go('administration');
    Modal.hide();
  }
});
