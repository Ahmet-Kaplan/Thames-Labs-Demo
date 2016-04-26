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

Template.insertProductModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateProducts'])) {
    toastr.warning("You do not have permission to create products");
    Modal.hide();
    return;
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
