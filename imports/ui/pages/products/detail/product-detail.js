import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import { Products } from '/imports/api/collections.js';

import '/imports/ui/components/breadcrumbs/breadcrumbs.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/documents/document-container.js';
import '/imports/ui/components/products/details-panel/product-details-panel.js';
import './product-detail.css';
import './product-detail.html';

Template.productDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    const product = Products.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof product === "undefined") {
      FlowRouter.go('products');
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
});

Template.productDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? `Product #${this.sequencedIdentifier}` : "Product");
  },
  productData: function() {
    const productId = FlowRouter.getParam('id');
    return Products.findOne({_id: productId});
  }
});
