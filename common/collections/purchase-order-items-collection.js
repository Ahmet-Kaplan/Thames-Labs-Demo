PurchaseOrderItems = new Mongo.Collection('purchaseorderitems');

Partitioner.partitionCollection(PurchaseOrderItems);

//////////////////////
// COLLECTION HOOKS //
//////////////////////

PurchaseOrderItems.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });

  LogClientEvent(LogLevel.Info, user.profile.name + " created a new purchase order item", 'purchaseOrderItem', doc._id);

  PurchaseOrders.update(doc.purchaseOrderId, {
    $set: {
      totalValue: parseFloat(_.sum(PurchaseOrderItems.find({
        purchaseOrderId: doc.purchaseOrderId
      }, {
        fields: {
          'totalPrice': 1
        }
      }).fetch(), 'totalPrice').toFixed(2))
    }
  }, function(err) {
    if (err) {
      LogClientEvent(LogLevel.Warning, "An error occurred whilst updating the total value of a purchase order: " + err, 'purchaseOrder', doc.purchaseOrderId);
    }
  });
});

PurchaseOrderItems.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });
  if (doc.description !== this.previous.description) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's description", 'purchaseOrderItem', doc._id);
  }
  if (doc.productCode !== this.previous.productCode) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's product code", 'purchaseOrderItem', doc._id);
  }
  if (doc.value !== this.previous.value) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's value", 'purchaseOrderItem', doc._id);
  }
  if (doc.quantity !== this.previous.quantity) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's quantity", 'purchaseOrderItem', doc._id);
  }
  if (doc.totalPrice !== this.previous.totalPrice) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's total price", 'purchaseOrderItem', doc._id);
  }
  if (doc.purchaseOrderId !== this.previous.purchaseOrderId) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's parent purchase order", 'purchaseOrderItem', doc._id);
  }

  PurchaseOrders.update(doc.purchaseOrderId, {
    $set: {
      totalValue: parseFloat(_.sum(PurchaseOrderItems.find({
        purchaseOrderId: doc.purchaseOrderId
      }, {
        fields: {
          'totalPrice': 1
        }
      }).fetch(), 'totalPrice').toFixed(2))
    }
  }, function(err) {
    if (err) {
      LogClientEvent(LogLevel.Warning, "An error occurred whilst updating the total value of a purchase order: " + err, 'purchaseOrder', doc.purchaseOrderId);
    }
  });
});

PurchaseOrderItems.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  PurchaseOrders.update(doc.purchaseOrderId, {
    $set: {
      totalValue: parseFloat(_.sum(PurchaseOrderItems.find({
        purchaseOrderId: doc.purchaseOrderId
      }, {
        fields: {
          'totalPrice': 1
        }
      }).fetch(), 'totalPrice').toFixed(2))
    }
  }, function(err) {
    if (err) {
      LogClientEvent(LogLevel.Warning, "An error occurred whilst updating the total value of a purchase order: " + err, 'purchaseOrder', doc.purchaseOrderId);
    }
  });

  var user = Meteor.users.findOne({
    _id: userId
  });
  LogClientEvent(LogLevel.Info, user.profile.name + " deleted purchase order item '" + doc.name + "'", 'purchaseOrder', doc.purchaseOrderId);
});