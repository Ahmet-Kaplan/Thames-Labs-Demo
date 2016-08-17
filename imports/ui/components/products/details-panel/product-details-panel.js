import "meteor/nemo64:bootstrap";
import Modal from "meteor/peppelg:bootstrap-3-modal";
import sanitizeHtml from "sanitize-html";
import bootbox from 'bootbox';
import { Template } from 'meteor/templating';
import { Products } from '/imports/api/collections.js';
import { currencyHelpers } from '/imports/api/currency/currency-helpers.js';

import '/imports/ui/components/products/modals/update-product-modal.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import './product-details-panel.html';

Template.productDetailsPanel.helpers({
  desc: function() {
    return sanitizeHtml(Template.currentData().description, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h2' ])
    });
  },
  userCurrencyIcon: function() {
    return currencyHelpers.userCurrency();
  }
});

Template.productDetailsPanel.events({
  'click #delete-product': function(event) {
    event.preventDefault();
    const productId = Template.currentData()._id;

    bootbox.confirm("Are you sure you wish to delete this product?", function(result) {
      if (result === true) {
        Products.remove(productId);
      }
    });
  },
  'click #edit-product': function(event) {
    event.preventDefault();
    Modal.show('updateProductModal', this);
  }
});