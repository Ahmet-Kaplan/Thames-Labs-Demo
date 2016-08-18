import './insert-tenant.html';

AutoForm.hooks({
  insertTenantModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    },
    onError: function(formType, error) {
      toastr.error('Tenant creation error: ' + error);
    }
  }
});
