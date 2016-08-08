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
    },
    onError: function(formType, error) {
      toastr.error('Purchase order update error: ' + error);
    }
  },
  addPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order item added.');
    },
    onError: function(formType, error) {
      toastr.error('Purchase order item creation error: ' + error);
    }
  },
  updatePurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order item edited.');
    },
    onError: function(formType, error) {
      toastr.error('Purchase order item update error: ' + error);
    }
  }
});
