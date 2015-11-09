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
  "click #close-first-run": function(event, template) {
    Modal.hide();
  },
  "click #first-run-upgrade": function(event, template) {
    FlowRouter.go('administration');
    Modal.hide();
  },
  "click #first-run-tour": function(event, template) {
    Modal.hide();
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  }
});
