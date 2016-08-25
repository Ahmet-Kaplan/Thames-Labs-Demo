import { moment } from 'meteor/momentjs:moment';
import { Companies } from '/imports/api/collections.js';
import './insert-company-purchase-order.html';

Template.insertCompanyPurchaseOrderModal.helpers({
  showSupplierContacts: function() {
    return (Template.currentData().supplierCompanyId !== null);
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    return moment();
  },
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
  }
});

AutoForm.hooks({
  insertCompanyPurchaseOrderForm: {
    onError: function(formType, error) {
      toastr.error(`Purchase order creation error: ${error}`);
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error(`Purchase order creation error: ${error}`);
          return false;
        }
        FlowRouter.go(`/purchaseorders/${result}`);
      }
    }
  }
});
