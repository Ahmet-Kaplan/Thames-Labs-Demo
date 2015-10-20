Activities = new Mongo.Collection('activities');

Partitioner.partitionCollection(Activities);

Activities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  },
  purchaseOrder: function() {
    return PurchaseOrders.findOne(this.purchaseOrderId);
  }
});

Activities.initEasySearch('notes', {
  limit: 50
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Activities.after.insert(function(userId, doc) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = PurchaseOrders.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  var content = TagStripper.strip(doc.notes, "", "", false);

  logEvent('info', 'A new activity has been created: ' + content + ' (' + entityName + ")");
});

Activities.after.update(function(userId, doc, fieldNames, modifier, options) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = Projects.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  if (doc.type !== this.previous.type) {
    logEvent('info', 'An existing activity has been updated: The value of "type" was changed from ' + this.previous.type + " to " + doc.type + ' (' + entityName + ")");
  }
  if (doc.notes !== this.previous.notes) {
    logEvent('info', 'An existing activity has been updated: The value of "notes" was changed. (' + entityName + ")");
  }
  if (doc.activityTimestamp !== this.previous.activityTimestamp) {
    logEvent('info', 'An existing activity has been updated: The value of "activityTimestamp" was changed from ' + this.previous.activityTimestamp + " to " + doc.activityTimestamp + ' (' + entityName + ")");
  }
});

Activities.after.remove(function(userId, doc) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = Projects.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  var content = TagStripper.strip(doc.notes, "", "", false);
  logEvent('info', 'An existing activity has been deleted: ' + content + ' (' + entityName + ")");
});
