import './overview.html';

const setValues = (template) => {
  Meteor.call('report.numberOfProducts', (err, data) => {
    template.totalProducts.set(data);
  });
  Meteor.call('report.costOfProducts', (err, data) => {
    template.totalProductsCost.set(data);
  });
  Meteor.call('report.averageProductsCost', (err, data) => {
    template.averageProductsCost.set(data);
  });
  Meteor.call('report.averageProductsPrice', (err, data) => {
    template.averageProductsPrice.set(data);
  });
};

Template.productsOverview.onCreated(function() {
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);
  this.averageProductsPrice = new ReactiveVar(0);
});

Template.productsOverview.onRendered(function() {
  setValues(this);
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
    setValues(template);
  }
});
