import { PurchaseOrders } from '/imports/api/collections.js';

Template.openPoWidget.onRendered(function() {
  Meteor.subscribe('allPurchaseOrders');
  Meteor.subscribe('allPurchaseOrderItemsNoPOID');
});

Template.openPoWidget.helpers({
  openPos: function() {
    var list = PurchaseOrders.find({
      status: 'Requested'
    }).fetch();

    var user = Meteor.users.findOne(Meteor.userId());
    var level = parseFloat(user.profile.poAuthLevel);

    var arr = [];

    _.each(list, function(po) {
      var items = PurchaseOrderItems.find({
        purchaseOrderId: po._id
      }).fetch();

      var total = 0;
      _.each(items, function(i) {
        total += parseFloat(i.totalPrice);
      });

      if (total <= level) {
        arr.push(po);
      }
    });

    return arr;
  }
});

Template.openPoEntry.onRendered(function() {
  Meteor.subscribe('allPurchaseOrderItems', this.data._id);
});

Template.openPoEntry.helpers({
  totalValue: function() {
    var items = PurchaseOrderItems.find({
      purchaseOrderId: this._id
    }).fetch();

    var total = 0;
    _.each(items, function(i) {
      total += parseFloat(i.totalPrice);
    });

    return total;
  }
});
