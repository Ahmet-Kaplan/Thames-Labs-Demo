Template.productDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var product = Products.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && product === undefined) {
      FlowRouter.go('products');
    }
  });

  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
});

Template.productDetail.helpers({
  'productData': function() {
    var productId = FlowRouter.getParam('id');
    return Products.findOne({_id: productId});
  },
  desc: function() {
    return UniHTML.purify(this.description);
  }
});

Template.productDetail.events({
  'click #delete-product': function(event) {
    event.preventDefault();
    var productId = this._id;

    bootbox.confirm("Are you sure you wish to delete this product?", function(result) {
      if (result === true) {
        Products.remove(productId);
      }
    });
  },

  'click #edit-product': function(event) {
    event.preventDefault();
    Modal.show('updateProductModal', this);
  },
});

AutoForm.hooks({
  updateProductForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Product updated.');
    }
  }
});
