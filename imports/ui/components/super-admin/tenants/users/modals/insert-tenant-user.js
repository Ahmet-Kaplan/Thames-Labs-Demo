import './insert-tenant-user.html';

Template.insertTenantUser.helpers({
  formId: function() {
    return 'form-' + this._id;
  }
});

AutoForm.hooks({
  insertTenantUserModal: {
    onSuccess: function(formType, result) {
      Modal.hide();
      toastr.success('User created.');
    },
    onError: function(formType, error) {
      toastr.error('User creation error: ' + error);
    }
  }
});