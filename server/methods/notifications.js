Meteor.methods({
  setNotified: function(notificationId) {
    var notification = Notifications.findOne(notificationId);
    if(notification.target !== this.userId) {
      throw new Meteor.Error(403, "You do not have the permission to alter this data.");
    }

    Notifications.update(notificationId, {
      $set: {
        notified: true
      }
    });
  },

  removeNotification: function(notificationId) {
    var notification = Notifications.findOne(notificationId);
    if(notification.target !== this.userId) {
      throw new Meteor.Error(403, "You do not have the permission to alter this data.");
    }

    Notifications.remove(notificationId);
  },

  addPoNotification: function(purchaseOrderId, status) {
    var purchaseOrder = PurchaseOrders.findOne({_id: purchaseOrderId});
    if(!purchaseOrder) {
      throw new Meteor.Error(404, 'No PO provided');
    }
    Notifications.insert({
      title: purchaseOrder.description || 'RealTimeCRM Purchase Order Notification',
      shortDescription: 'RealTimeCRM Purchase Order Notification',
      detail: "Your purchase order '" + purchaseOrder.description + "' has been " + status + ".",
      target: purchaseOrder.createdBy,
      createdAt: new Date(),
      createdBy: this.userId,
      icon: 'shopping-cart'
    });
  }
})
