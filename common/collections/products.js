Collections.products = Products = new Mongo.Collection('products');

Partitioner.partitionCollection(Products);

Products.initEasySearch(['name'], {
  limit: 50
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Products.after.insert(function(userId, doc) {
  logEvent('info', 'A new product has been created: ' + doc.name);
});

Products.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing product has been updated: The value of "description" was changed');
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing product has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  if (doc.cost !== this.previous.cost) {
    logEvent('info', 'An existing product has been updated: The value of "cost price" was changed from ' + this.previous.cost + " to " + doc.cost);
  }
  if (doc.price !== this.previous.price) {
    logEvent('info', 'An existing product has been updated: The value of "sales price" was changed from ' + this.previous.price + " to " + doc.price);
  }
});

Products.after.remove(function(userId, doc) {
  logEvent('info', 'A product has been deleted: ' + doc.name);
});
