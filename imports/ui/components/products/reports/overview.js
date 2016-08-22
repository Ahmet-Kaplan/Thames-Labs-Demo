import './overview.html';

Template.productsOverview.onCreated(function() {
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);
});

Template.productsOverview.onRendered(function() {
  Meteor.call('report.numberOfProducts', (err, data) => {
    this.totalProducts.set(data.Count);
  });
  Meteor.call('report.costOfProducts', (err, data) => {
    this.totalProductsCost.set(data.Value);
  });
  Meteor.call('report.averageProductsCost', (err, data) => {
    this.averageProductsCost.set(data.Value);
  });
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
  }
});
