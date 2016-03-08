AutoForm.hooks({
  addTenantUserModal: {
    before: {
      insert: function(doc) {
        var tenantId = Meteor.user().group;
        if (!isProTenant(tenantId) && TenantUserCount(tenantId) >= MAX_FREE_USERS) {
          toastr.warning('To add more users, this tenant must first upgrade to the Pro plan.');
          return false;
        }

        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      Modal.hide();
      toastr.success('User created.');
    }
  }
});
