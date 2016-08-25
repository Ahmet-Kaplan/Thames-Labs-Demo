import { PurchaseOrders } from '/imports/api/collections.js';
import { PurchaseOrderItemSchema } from './schema.js';

export const PurchaseOrderItems = new Mongo.Collection('purchaseorderitems');

PurchaseOrderItems.attachSchema(PurchaseOrderItemSchema);

Partitioner.partitionCollection(PurchaseOrderItems);

PurchaseOrderItems.permit(['insert']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrderItems.permit(['update']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();
PurchaseOrderItems.permit(['remove']).ifLoggedIn().ifHasRole('CanEditPurchaseOrders').apply();

//////////////////////
// COLLECTION HOOKS //
//////////////////////

PurchaseOrderItems.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  const user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new purchase order item", 'purchaseOrder', doc.purchaseOrderId);
  }

  PurchaseOrders.update(doc.purchaseOrderId, {
    $set: {
      totalValue: parseFloat(_.sumBy(PurchaseOrderItems.find({
        purchaseOrderId: doc.purchaseOrderId
      }, {
        fields: {
          'totalPrice': 1
        }
      }).fetch().totalPrice).toFixed(2))
    }
  }, function(err) {
    if (err) {
      LogClientEvent(LogLevel.Warning, "An error occurred whilst updating the total value of a purchase order: " + err, 'purchaseOrder', doc.purchaseOrderId);
    }
  });
});

PurchaseOrderItems.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  const user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    if (doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's description", 'purchaseOrder', doc.purchaseOrderId);
    }
    if (doc.productCode !== this.previous.productCode) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's product code", 'purchaseOrder', doc.purchaseOrderId);
    }
    if (doc.value !== this.previous.value) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's value", 'purchaseOrder', doc.purchaseOrderId);
    }
    if (doc.quantity !== this.previous.quantity) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's quantity", 'purchaseOrder', doc.purchaseOrderId);
    }
    if (doc.totalPrice !== this.previous.totalPrice) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's total price", 'purchaseOrder', doc.purchaseOrderId);
    }
    if (doc.purchaseOrderId !== this.previous.purchaseOrderId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a purchase order item's parent purchase order", 'purchaseOrder', doc.purchaseOrderId);
    }
  }

  PurchaseOrders.update(doc.purchaseOrderId, {
    $set: {
      totalValue: parseFloat(_.sumBy(PurchaseOrderItems.find({
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
      totalValue: parseFloat(_.sumBy(PurchaseOrderItems.find({
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

  const user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted purchase order item '" + doc.name + "'", 'purchaseOrder', doc.purchaseOrderId);
  }
});
