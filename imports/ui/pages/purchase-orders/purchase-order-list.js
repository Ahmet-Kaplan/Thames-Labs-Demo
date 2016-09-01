import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/purchase-orders/modals/insert/insert-purchase-order.js';
import '/imports/ui/components/purchase-orders/list-item/purchase-order-list-item.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/import/import.js';
import '/imports/ui/components/purchase-orders/reports/overview.js';

import './purchase-order-list.html';

Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
  Session.set("showItems", false);

  // Store search index dict on template to allow helpers to access
  this.index = PurchaseOrdersIndex;

  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);

  this.showItems = new ReactiveVar(false);
});

Template.purchaseOrderList.onRendered(function() {
  const template = this;

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

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: ".list-header-right"
  });

  if(!_.get(Collections['purchaseorders'].index.getComponentDict().get('searchOptions').props, "active")) {
    Collections['purchaseorders'].index.getComponentMethods().addProps('active', 'Yes');
  }
});

Template.purchaseOrderList.events({
  'click #toggle-item-view': function(event, template) {
    const curr = Session.get("showItems");
    Session.set("showItems", !curr);
    template.showItems.set(!curr);
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('insertPurchaseOrderModal', this);
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
  showItems: function() {
    return Template.instance().showItems.get();
  }
});
