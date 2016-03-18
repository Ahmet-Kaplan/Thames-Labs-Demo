AutoForm.hooks({
  newPurchaseOrderForm: {
    onError: function(formType, error) {
      toastr.error('Purchase order creation error: ' + error);
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Purchase order creation error: ' + error);
          return false;
        }

        FlowRouter.go('/purchaseorders/' + result);

      }
    }
  },
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order details updated.');
    }
  },
  addPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order item added.');
    }
  },
  editPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order item edited.');
    }
  }
});
