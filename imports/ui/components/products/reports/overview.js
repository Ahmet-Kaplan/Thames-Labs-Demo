import './overview.html';

Template.productsOverview.onCreated(function() {
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);
  this.averageProductsPrice = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.numberOfProducts', (err, data) => {
      this.totalProducts.set(data);
    });
    Meteor.call('report.costOfProducts', (err, data) => {
      this.totalProductsCost.set(data);
    });
    Meteor.call('report.averageProductsCost', (err, data) => {
      this.averageProductsCost.set(data);
    });
    Meteor.call('report.averageProductsPrice', (err, data) => {
      this.averageProductsPrice.set(data);
    });
  };
});

Template.productsOverview.onRendered(function() {
  this.setValues();
});

Template.productsOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
  },
  totalProducts: function() {
    return Template.instance().totalProducts.get();
  },
  totalProductsCost: function() {
    return Template.instance().totalProductsCost.get();
  },
  averageProductsCost: function() {
    return Template.instance().averageProductsCost.get();
  },
  averageProductsPrice: function() {
    return Template.instance().averageProductsPrice.get();
  }
});

Template.productsOverview.events({
  'click #productOverviewWidget': function(event, template) {
    template.setValues();
  }
});
