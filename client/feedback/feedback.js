Template.feedbackModal.helpers({
  'userName': function() {
    return Meteor.user().profile.name;
  },
  'currentUrl': function() {
    return Router.current().url;
  }
});

AutoForm.hooks({
  feedbackForm: {
    onSuccess: function() {
      Modal.hide();
    }
  }
});
