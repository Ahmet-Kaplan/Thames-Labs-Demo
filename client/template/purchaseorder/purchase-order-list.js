Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!IsTenantPro(Meteor.user().group)) {
      ShowUpgradeToastr('To access Purchase Orders');
      FlowRouter.go('/');
    }
    
    redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);
});

Template.purchaseOrderList.onRendered(function() {
  var template = this;

  Meteor.call('report.numberOfPurchaseOrders', function(err, data) {
    template.totalPurchaseOrders.set(data.Count);
  });
  Meteor.call('report.ApprovedPo', function(err, data) {
    template.totalApprovedPo.set(data.Count);
  });
  Meteor.call('report.ArrivedPo', function(err, data) {
    template.totalArrivedPo.set(data.Count);
  });
  Meteor.call('report.ClosedPo', function(err, data) {
    template.totalClosedPo.set(data.Count);
  });
  Meteor.call('report.CancelledPo', function(err, data) {
    template.totalCancelledPo.set(data.Count);
  });
  Meteor.call('report.RejectedPo', function(err, data) {
    template.totalRejectedPo.set(data.Count);
  });

  $('[data-toggle="popover"]').popover({html: true, placement: "bottom", container: "#btn-popover"});
});

Template.purchaseOrderList.events({
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('purchaseorders');
  },
  'click #ref_poOverviewWidget': function(event, template) {

      Meteor.call('report.numberOfPurchaseOrders', function(err, data) {
        template.totalPurchaseOrders.set(data.Count);
      });
      Meteor.call('report.ApprovedPo', function(err, data) {
        template.totalApprovedPo.set(data.Count);
      });
      Meteor.call('report.ArrivedPo', function(err, data) {
        template.totalArrivedPo.set(data.Count);
      });

      Meteor.call('report.ClosedPo', function(err, data) {
        template.totalClosedPo.set(data.Count);
      });
      Meteor.call('report.CancelledPo', function(err, data) {
        template.totalCancelledPo.set(data.Count);
      });
      Meteor.call('report.RejectedPo', function(err, data) {
        template.totalRejectedPo.set(data.Count);
      });
    }
});

Template.purchaseOrderList.helpers({
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
  },
});
