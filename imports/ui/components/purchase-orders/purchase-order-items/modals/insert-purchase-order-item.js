import $ from 'jquery';
import './insert-purchase-order-item.html';

Template.insertPurchaseOrderItemModal.onRendered(function() {
  const v = $('#itemValue').val();
  const q = $('#currQuant').val();

  Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
    if (error) {
      return false;
    }
    $('#activePrice').prop('value', result);
  });
});

Template.insertPurchaseOrderItemModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.insertPurchaseOrderItemModal.events({
  'change #itemValue, blur #itemValue': function() {
    const v = $('#itemValue').val();
    const q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  },
  'change #currQuant, blur #currQuant': function() {
    const v = $('#itemValue').val();
    const q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  }
});