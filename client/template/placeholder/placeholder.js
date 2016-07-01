Template.placeholder.events({
  'click #feedback-link': function(event) {
    event.preventDefault();
    Modal.show('feedbackModal');
  }
});