import '/imports/ui/components/products/product-list-item.js';
import './product-list.html';

Template.productList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProducts');
  });
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);

  this.productCount = new ReactiveVar(0);
});

Template.productList.onRendered(function() {
  var template = this;

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
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('products');
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
