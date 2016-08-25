import './overview.html';

const setValues = (template) => {
  Meteor.call('report.numberOfPurchaseOrders', (err, data) => {
    template.totalPurchaseOrders.set(data);
  });
  Meteor.call('report.ApprovedPo', (err, data) => {
    template.totalApprovedPo.set(data);
  });
  Meteor.call('report.ArrivedPo', (err, data) => {
    template.totalArrivedPo.set(data);
  });
  Meteor.call('report.ClosedPo', (err, data) => {
    template.totalClosedPo.set(data);
  });
  Meteor.call('report.CancelledPo', (err, data) => {
    template.totalCancelledPo.set(data);
  });
  Meteor.call('report.RejectedPo', (err, data) => {
    template.totalRejectedPo.set(data);
  });
};

Template.poOverview.onCreated(function() {
  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);
});

Template.poOverview.onRendered(function() {
  setValues(this);
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
    setValues(template);
  }
});
