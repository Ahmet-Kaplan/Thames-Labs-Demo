Collections.activities = Activities = new Mongo.Collection('activities');

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
  },
  task: function() {
    return Tasks.findOne(this.taskId);
  }
});

Tags.TagsMixin(Activities);


////////////////////
// SEARCH INDICES //
////////////////////

Collections.activities.index = ActivitiesIndex = new EasySearch.Index({
  collection: Activities,
  fields: ['type', 'notes', 'primaryEntityDisplayData'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'activityTimestamp': -1
      };
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.tags) {
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }
      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      var collectionsToFilter = [];
      var perms = ['companies', 'contacts', 'opportunities', 'projects', 'tasks', 'purchaseorders'];
      var userId = options.search.userId;
      for (var p in perms) {
        var perm = permissionGenerator('read', perms[p]);

        if (!Roles.userIsInRole(userId, perm)) {
          collectionsToFilter.push(perms[p]);
        }
      }

      selector.primaryEntityType = {
        $nin: collectionsToFilter
      };

      return selector;
    }
  })
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
  if (doc.taskId) {
    entity = Tasks.findOne(doc.taskId);
    entityName = "Task: " + entity.title;
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
    entity = PurchaseOrders.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }
  if (doc.taskId) {
    entity = Tasks.findOne(doc.taskId);
    entityName = "Task: " + entity.title;
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
    entity = PurchaseOrders.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }
  if (doc.taskId) {
    entity = Tasks.findOne(doc.taskId);
    entityName = "Task: " + entity.title;
  }

  var content = TagStripper.strip(doc.notes, "", "", false);
  logEvent('info', 'An existing activity has been deleted: ' + content + ' (' + entityName + ")");
});
