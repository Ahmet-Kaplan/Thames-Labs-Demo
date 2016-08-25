import './insert-tenant-user.html';

Template.insertTenantUser.helpers({
  isProTenant: function() {
    return isProTenant(this.__originalId);
  }
});

AutoForm.hooks({
  insertTenantUserModal: {
    onSuccess: function(formType, result) {
      Modal.hide();
      toastr.success('User created.');
    },
    onError: function(formType, error) {
      toastr.error(`User creation error: ${error}`);
    }
  }
});