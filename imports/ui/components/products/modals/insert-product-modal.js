import './insert-product-modal.html';
import "meteor/peppelg:bootstrap-3-modal";
import { Products } from '/imports/api/collections.js';

Template.insertProductModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  },
  formCollection() {
    return Products;
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
