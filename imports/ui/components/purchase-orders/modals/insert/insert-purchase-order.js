import $ from 'jquery';
import moment from 'moment';
import './insert-purchase-order.html';

//Todo: sort out session vars
Template.insertPurchaseOrderModal.onRendered(function() {
  Session.set('posc', null);

  const c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

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

Template.insertPurchaseOrderModal.events({
  'change #supplierCompanyId': function() {
    const c = $('select#supplierCompanyId').val();
    if (c) {
      Session.set('posc', c);
    } else {
      Session.set('posc', null);
    }
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