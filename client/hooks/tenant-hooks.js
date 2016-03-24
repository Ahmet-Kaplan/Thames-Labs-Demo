AutoForm.hooks({
  addTenantModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    },
    onError: function(formType, error) {
      toastr.error('Tenant creation error: ' + error);
    }
  },
  updateTenantSettingsModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant settings updated.');
    },
    onError: function(formType, error) {
      toastr.error('Tenant settings update error: ' + error);
    }
  }
})
