AutoForm.hooks({
  addTenantUserModal: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('User created.');
      //logEvent('verbose', 'A new tenant user has been created.', 'User', this.docId);
    }
  }
})