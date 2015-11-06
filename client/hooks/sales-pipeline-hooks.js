AutoForm.hooks({
  insertNewStageForm: {
    onSuccess: function() {
      toastr.success('Stage created.');
      Modal.hide();
    }
  },
  editStageForm: {
    onSuccess: function() {
      toastr.success('Stage edited.');
      Modal.hide();
    }
  }
});