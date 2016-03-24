AutoForm.hooks({
  feedbackForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Thank you for your feedback!');
    },
    onError: function(formType, error) {
      toastr.error('Feedback submission error: ' + error);
    }
  }
});
