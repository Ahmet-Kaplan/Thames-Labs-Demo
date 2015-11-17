AutoForm.hooks({
  newPurchaseOrderForm: {
    before: {
      insert: function(doc) {
        var t = Tenants.find({}).fetch()[0];
        if (t) {
          doc.orderNumber = String(t.settings['PurchaseOrderPrefix']) + "" + String(t.settings['PurchaseOrderStartingValue']);
          return doc;
        }
      }
    },
    onError: function(formType, error) {
      toastr.error('Purchase order creation error: ' + error);
    },
    onSuccess: function() {
      var t = Tenants.find({}).fetch()[0];
      if (t) {
        var val = t.settings['PurchaseOrderStartingValue'];
        var newVal = Number(val) + 1;

        var o = {
          PurchaseOrderPrefix: t.settings['PurchaseOrderPrefix'],
          PurchaseOrderStartingValue: newVal
        };

        Tenants.update(t._id, {
          $set: {
            settings: o
          }
        });
      }

      Modal.hide();
      toastr.success('Purchase Order created.');
    },
    after: {
      insert: function(error, result) {
        if(error) {
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
