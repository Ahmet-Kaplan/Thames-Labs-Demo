Template.insertProductModal.onCreated(function() {
  //Update the default numbering system
  var tenant = Tenants.findOne({});
  Tenants.update({
    _id: tenant._id
  }, {
    $inc: {
      'settings.product.defaultNumber': 1
    }
  });
});

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
