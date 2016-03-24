AutoForm.hooks({
  insertNewStageForm: {
    onSuccess: function() {
      toastr.success('Stage created.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Stage creation error: ' + error);
    }
  },
  editStageForm: {
    onSuccess: function() {
      toastr.success('Stage updated.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Stage update error: ' + error);
    }
  }
});
