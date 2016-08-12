import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/products/modals/update-product-modal.js';
import Modal from "meteor/peppelg:bootstrap-3-modal";
import bootbox from 'bootbox';
import './product-detail.html';

Template.productDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var product = Products.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof product === "undefined") {
      FlowRouter.go('products');
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
});

Template.productDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Product #" + this.sequencedIdentifier : "Product");
  },
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
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('updateProductModal', this);
  }
});