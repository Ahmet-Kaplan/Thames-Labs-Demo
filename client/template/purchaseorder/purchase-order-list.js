Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
});

Template.purchaseOrderList.events({
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
  },
});

Template.purchaseOrderList.helpers({
  purchaseOrderCount: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'purchaseorders'
    });
    return easySearchInstance.get('total');
  },
  hasMultiplePurchaseOrders: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'purchaseorders'
    });
    return easySearchInstance.get('total') !== 1;
  }
});
