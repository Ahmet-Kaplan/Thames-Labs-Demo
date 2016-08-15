import $ from 'jquery';
import moment from 'moment';
import './insert-company-purchase-order.html';

//TODO: sort out session variables
Template.insertCompanyPurchaseOrderModal.onRendered(function() {
  Session.set('posc', null);

  const c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.insertCompanyPurchaseOrderModal.helpers({
  showSupplierContacts: function() {
    return (Session.get('posc') !== null);
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
  }
});

Template.insertCompanyPurchaseOrderModal.events({
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
