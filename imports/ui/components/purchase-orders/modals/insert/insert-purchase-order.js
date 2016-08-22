import { moment } from 'meteor/momentjs:moment';
import './insert-purchase-order.html';

Template.insertPurchaseOrderModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    const dateTime = moment();
    const dateValue = moment({
      year: dateTime.year(),
      month: dateTime.month(),
      day: dateTime.date()
    });
    return dateValue;
  }
});

AutoForm.hooks({
  insertPurchaseOrderForm: {
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