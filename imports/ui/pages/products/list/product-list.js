import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/products/list-item/product-list-item.js';
import '/imports/ui/components/export/export.js';
import './product-list.html';

Template.productList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);

  this.productCount = new ReactiveVar(0);
});

Template.productList.onRendered(function() {
  const template = this;

  this.autorun(() => {
    this.productCount.set(Collections['products'].index.getComponentDict().get('count'));
  });

  Meteor.call('report.numberOfProducts', function(err, data) {
    template.totalProducts.set(data.Count);
  });
  Meteor.call('report.costOfProducts', function(err, data) {
    template.totalProductsCost.set(data.Value);
  });
  Meteor.call('report.averageProductsCost', function(err, data) {
    template.averageProductsCost.set(data.Value);
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
  },
  'click #ref_productsOverviewWidget': function(event, template) {

    Meteor.call('report.numberOfProducts', function(err, data) {
      template.totalProducts.set(data.Count);
    });
    Meteor.call('report.costOfProducts', function(err, data) {
      template.totalProductsCost.set(data.Value);
    });
    Meteor.call('report.averageProductsCost', function(err, data) {
      template.averageProductsCost.set(data.Value);
    });
  }
});

Template.productList.helpers({
  totalProducts: function() {
    return Template.instance().totalProducts.get();
  },
  totalProductsCost: function() {
    return Template.instance().totalProductsCost.get();
  },
  averageProductsCost: function() {
    return Template.instance().averageProductsCost.get();
  },
  productCount: function() {
    return Template.instance().productCount.get();
  },
  hasMultipleProducts: function() {
    return Template.instance().productCount.get() !== 1;
  }
});
