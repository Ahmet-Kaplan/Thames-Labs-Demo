AutoForm.hooks({
  addTenantModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    }
  },
  updateTenantSettingsModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant settings updated.');
    }
  }
})
