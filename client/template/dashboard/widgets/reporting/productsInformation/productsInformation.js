Template.productsInformationWidget.onCreated(function() {
  this.totalProducts = new ReactiveVar(0);
  this.totalProductsCost = new ReactiveVar(0);
  this.averageProductsCost = new ReactiveVar(0);
});

Template.productsInformationWidget.onRendered(function() {
  var template = this;

  Meteor.call('report.numberOfProducts', function(err, data) {
    template.totalProducts.set(data.Count);
  });
  Meteor.call('report.costOfProducts', function(err, data) {
    template.totalProductsCost.set(data.Value);
  });
  Meteor.call('report.averageProductsCost', function(err, data) {
    template.averageProductsCost.set(data.Value);
  });
});

Template.productsInformationWidget.events({
  'click #ref_productsInformationWidget': function(event, template) {

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

Template.productsInformationWidget.helpers({
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