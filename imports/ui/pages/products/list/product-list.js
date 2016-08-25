import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/products/list-item/product-list-item.js';
import '/imports/ui/components/export/export.js';
import './product-list.html';
import '/imports/ui/components/products/reports/overview.js';

Template.productList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });

  this.productCount = new ReactiveVar(0);
});

Template.productList.onRendered(function() {

  this.autorun(() => {
    this.productCount.set(Collections['products'].index.getComponentDict().get('count'));
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });
});

Template.productList.events({
  'click #add-product': function(event) {
    event.preventDefault();
    Modal.show('insertProductModal', this);
  }
});

Template.productList.helpers({
  productCount: function() {
    return Template.instance().productCount.get();
  },
  hasMultipleProducts: function() {
    return Template.instance().productCount.get() !== 1;
  }
});
