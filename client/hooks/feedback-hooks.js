AutoForm.hooks({
  feedbackForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Feedback submitted.');
    }
  }
});