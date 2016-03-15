Template.help.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.welcomeTour": true
    }
  });
  hopscotch.endTour(true);
})

Template.help.events({
  'click #close-first-run': function(event, template) {
    Modal.hide();
  },
  'click #first-run-upgrade': function(event, template) {
    FlowRouter.go('administration');
    Modal.hide();
  },
  'click #first-run-tour': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
		hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  'click #companies-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  'click #contacts-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  'click #admin-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  },
  'click #tags-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/tags-tutorial-p1.js');
  }
});
