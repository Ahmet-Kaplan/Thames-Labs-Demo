Template.firstRunMobile.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.mobile": true
    }
  });
});

Template.firstRunMobile.events({
  'click #close-first-run': function(event) {
    FlowRouter.go('dashboard');
    Modal.hide();
  }
})
