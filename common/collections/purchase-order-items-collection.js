PurchaseOrderItems = new Mongo.Collection('purchaseorderitems');

Partitioner.partitionCollection(PurchaseOrderItems);

//////////////////////
// COLLECTION HOOKS //
//////////////////////

PurchaseOrderItems.after.insert(function(userId, doc) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);
  logEvent('info', 'A new purchase order item has been created: ' + doc.name + '(' + currentPurchaseOrder.description + ")");
});

PurchaseOrderItems.after.update(function(userId, doc, fieldNames, modifier, options) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.productCode !== this.previous.productCode) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "productCode" was changed from ' + this.previous.productCode + " to " + doc.productCode + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.value !== this.previous.value) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "value" was changed from ' + this.previous.value + " to " + doc.value + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.quantity !== this.previous.quantity) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "quantity" was changed from ' + this.previous.quantity + " to " + doc.quantity + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.totalPrice !== this.previous.totalPrice) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "totalPrice" was changed from ' + this.previous.totalPrice + " to " + doc.totalPrice + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.purchaseOrderId !== this.previous.purchaseOrderId) {
    var prevPO = Projects.findOne(this.previous.purchaseOrderId);
    var newPO = Projects.findOne(doc.purchaseOrderId);
    logEvent('info', 'An existing purchase order has been updated: The value of "purchaseOrderId" was changed from ' + this.previous.purchaseOrderId + '(' + prevPO.description + ") to " + doc.purchaseOrderId + ' (' + newPO.description + ')');
  }
});

PurchaseOrderItems.after.remove(function(userId, doc) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);
  logEvent('info', 'A purchase order item has been deleted: ' + doc.name + ' (' + currentPurchaseOrder.description + ")");
});
