AutoForm.hooks({
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order updated.');
    }
  }
});

Template.purchaseOrderDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.purchaseOrderDetail.rendered = function(){
  document.title = "Purchase Order - " + this.data.description;
  SetRouteDetails(document.title);
};

Template.purchaseOrderDetail.events({
  'click #add-item': function() {
    Modal.show('addPurchaseOrderItemModal', {
      project: this
    });
  },
  'click #add-activity': function() {
    Modal.show('insertPurchaseOrderActivityModal', {
      purchaseOrder: this
    });
  },
  'click #edit-purchase-order': function() {
    Modal.show('updatePurchaseOrderFormModal', this);
  }
});

Template.purchaseOrderItem.events({
  'click #removePurchaseOrderItem': function() {
    g_PurchaseOrderItems.remove(this._id);
  },
  'click #edit-po-item': function() {
    Modal.show('editPurchaseOrderItemModal', this);
  }
});

Template.purchaseOrderItem.helpers({
  currencySymbol: function() {
    if (this.currency === "GBP") return "£";
    if (this.currency === "USD") return "$";
    if (this.currency === "EUR") return "€";
  }
});

Template.purchaseOrderDetail.helpers({
  hasItems: function() {
    return g_PurchaseOrderItems.find({
      purchaseOrderId: this._id
    }).count() > 0;
  },
  purchaseOrderItems: function() {
    return g_PurchaseOrderItems.find({
      purchaseOrderId: this._id
    });
  }
});
