import './overview.html';

Template.poOverview.onCreated(function() {
  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);

  this.setValues = () => {
    Meteor.call('report.numberOfPurchaseOrders', (err, data) => {
      this.totalPurchaseOrders.set(data);
    });
    Meteor.call('report.ApprovedPo', (err, data) => {
      this.totalApprovedPo.set(data);
    });
    Meteor.call('report.ArrivedPo', (err, data) => {
      this.totalArrivedPo.set(data);
    });
    Meteor.call('report.ClosedPo', (err, data) => {
      this.totalClosedPo.set(data);
    });
    Meteor.call('report.CancelledPo', (err, data) => {
      this.totalCancelledPo.set(data);
    });
    Meteor.call('report.RejectedPo', (err, data) => {
      this.totalRejectedPo.set(data);
    });
  };
});

Template.poOverview.onRendered(function() {
  this.setValues();
});

Template.poOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
  },
  totalPurchaseOrders: function() {
    return Template.instance().totalPurchaseOrders.get();
  },
  totalApprovedPo: function() {
    return Template.instance().totalApprovedPo.get();
  },
  totalArrivedPo: function() {
    return Template.instance().totalArrivedPo.get();
  },
  totalClosedPo: function() {
    return Template.instance().totalClosedPo.get();
  },
  totalCancelledPo: function() {
    return Template.instance().totalCancelledPo.get();
  },
  totalRejectedPo: function() {
    return Template.instance().totalRejectedPo.get();
  }
});

Template.poOverview.events({
  'click #ref_poOverviewWidget': function(event, template) {
    template.setValues();
  }
});
