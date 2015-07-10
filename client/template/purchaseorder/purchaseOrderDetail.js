AutoForm.hooks({
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order updated.');
    }
  }
});

Template.purchaseOrderDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function(){
     var purchaseOrder = PurchaseOrders.findOne(FlowRouter.getParam('id'));
     if (purchaseOrder) return;
     FlowRouter.go('purchaseOrders');
  });
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
    PurchaseOrderItems.remove(this._id);
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
  purchaseOrderData: function() {
    var purchaseOrderId = FlowRouter.getParam('id');
    return PurchaseOrders.findOne(purchaseOrderId);
  },
  hasItems: function() {
    return PurchaseOrderItems.find({
      purchaseOrderId: this._id
    }).count() > 0;
  },
  purchaseOrderItems: function() {
    return PurchaseOrderItems.find({
      purchaseOrderId: this._id
    });
  }
});
