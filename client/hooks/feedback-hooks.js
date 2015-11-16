AutoForm.hooks({
  feedbackForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Thank you for your feedback!');
    }
  }
});
