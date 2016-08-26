import './insert-tenant-user.html';
import { UserSchema } from '/imports/api/users/schema.js';

Template.insertTenantUser.helpers({
  formId: function() {
    return 'form-' + this._id;
  },
  UserSchema: function() {
    return UserSchema;
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