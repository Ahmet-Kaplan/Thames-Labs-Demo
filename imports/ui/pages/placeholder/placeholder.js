import './placeholder.html';
import './placeholder.css';

Template.placeholder.onRendered(function() {
  if(Meteor.user()) {
    LogServerEvent(LogLevel.Warning, Meteor.user().profile.name + " landed on the placeholder page when trying to access " + FlowRouter.current().path, null, null);
  }
});

Template.placeholder.events({
  'click #feedback-link': function(event) {
    event.preventDefault();
    Modal.show('feedbackModal');
  }
});
