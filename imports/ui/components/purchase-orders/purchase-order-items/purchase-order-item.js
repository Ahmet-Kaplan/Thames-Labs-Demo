import bootbox from 'bootbox';
import { Projects, PurchaseOrderItems } from '/imports/api/collections.js';

import './purchase-order-item.html';

Template.purchaseOrderItem.helpers({
  currencySymbol: function() {
    if (this.currency === "GBP") return "£";
    if (this.currency === "USD") return "$";
    if (this.currency === "EUR") return "€";
  },
  canAddMoreItems: function(parentContext) {
    this.parentContext = parentContext;
    return (this.parentContext.status === "Requested");
  },
  orderItemStatus: function() {
    if (typeof this.status === "undefined") {
      return "No status set.";
    }
    return this.status;
  },
  statusIcon: function() {
    switch (this.status) {
      case 'Dispatched':
        return "fa fa-fw fa-truck text-warning";
      case 'Delivered':
        return "fa fa-fw fa-check text-success";
      case 'Cancelled':
        return "fa fa-fw fa-times text-danger";
      default:
        return "";
    }
  },
  projectName: function() {
    const project = Projects.findOne(this.projectId);
    if (project) return project.name;
    return "No project";
  }
});

Template.purchaseOrderItem.events({
  'click #removePurchaseOrderItem': function(event) {
    event.preventDefault();
    const itemId = this._id;
    bootbox.confirm("Are you sure you wish to delete this item?", function(result) {
      if (result === true) {
        PurchaseOrderItems.remove(itemId);
      }
    });
  },
  'click #edit-po-item': function(event) {
    event.preventDefault();
    Modal.show('updatePurchaseOrderItemModal', {
      purchaseOrder: Template.parentData(),
      purchaseOrderItem: this
    });
  }
});
