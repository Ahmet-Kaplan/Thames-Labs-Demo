Template.insertProductModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});

AutoForm.hooks({
  insertProductForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Product created.');
    }
  }
});
