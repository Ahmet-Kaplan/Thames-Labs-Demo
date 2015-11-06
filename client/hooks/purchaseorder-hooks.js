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
      toastr.error('An error occurred: Purchase order not created.');
      //logEvent('error', 'Purchase order not created: ' + error, 'Purchase Order', this.docId);
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
      toastr.success('Purchase Order raised.');
      //logEvent('info', 'Purchase order created.', 'Purchase Order', this.docId);
    },
    after: {
      insert: function(error, result) {
        if(error) {
          toastr.error('An error has occured, purchase order not raised.');
          return false;
        }

        FlowRouter.go('/purchaseorders/' + result);

      }
    }
  },
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase details updated.');
      //logEvent('info', 'Contact created.', 'Contact', this.docId);
    }
  },
  addPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item added.');
      //logEvent('info', 'Purchase order item added.');
    }
  },
  editPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item edited.');
      //logEvent('info', 'Purchase order item edited.');
    }
  }
});