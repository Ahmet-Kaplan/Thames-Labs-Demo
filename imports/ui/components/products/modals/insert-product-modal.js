import './insert-product-modal.html';

Template.insertProductModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
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
