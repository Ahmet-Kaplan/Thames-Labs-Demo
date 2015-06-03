// NB! did this instead of using Template.nav.events as
// the nav is outside of Iron Router's {{> yield}} and the
// router seemed to destroy events on route change.
Template.nav.onRendered(function() {
  $('#feedback-link').click(function() {
    Modal.show('feedbackModal');
  });
})

Template.nav.helpers({
  loggedIn: function() {
    if (!Meteor.userId()) {
      return false;
    } else {
      return true;
    }
  }
});
