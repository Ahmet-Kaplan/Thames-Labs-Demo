AutoForm.hooks({
  addTenantUserModal: {
    onSuccess: function(formType, result) {
      Modal.hide();
      toastr.success('User created.');
    },
    onError: function(formType, error) {
      toastr.error('User creation error: ' + error);
    }
  }
});