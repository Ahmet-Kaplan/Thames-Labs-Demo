AutoForm.hooks({
  addTenantUserModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('User created.');
    }
  },
  addTenantModal: {

    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    }
  },
  addNewCompanyModal: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        console.log(doc.createdBy);
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company created.');
    }
  }
});
