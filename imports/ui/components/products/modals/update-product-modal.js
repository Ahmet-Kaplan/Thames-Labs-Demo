import './update-product-modal.html';

Template.updateProductModal.helpers({
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

AutoForm.hooks({
  updateProductForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Product updated.');
    }
  }
});
