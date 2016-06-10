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
// SEARCH FILTERS //
////////////////////

Collections.activities.filters = {
  type: {
    display: 'Type:',
    prop: 'type',
    defaultOptions: function() {
      return ['Call', 'Note', 'Email'];
    },
    strict: true,
    allowMultiple: true,
    verify: function(type) {
      if (!type) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'activities'
    },
    valueField: 'name',
    nameField: 'name'
  }
};


////////////////////
// SEARCH INDICES //
////////////////////

Collections.activities.index = ActivitiesIndex = new EasySearch.Index({
  collection: Activities,
  fields: ['type', 'notes', 'primaryEntityDisplayData'],
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'activityTimestamp': -1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      return {
        'type': 1,
        'notes': 1,
        'activityTimestamp': 1,
        'tags': 1,
        'createdAt': 1,
        'companyId': 1,
        'contactId': 1,
        'projectId': 1,
        'purchaseOrderId': 1,
        'opportunityId': 1,
        'taskId': 1,
        'primaryEntityType': 1,
        'primaryEntityDisplayData': 1,
        'primaryEntityId': 1,
        'createdBy': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.tags) {
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.type) {
        selector.type = {
          $in: options.search.props.type.split(',')
        };
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      var collectionsToFilter = getDisallowedPermissions(options.search.userId);

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
  var entityType;
  var entityId;
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  if (doc.companyId) {
    entityType = "company";
    entityId = doc.companyId;
  }
  if (doc.contactId) {
    entityType = "contact";
    entityId = doc.contactId;
  }
  if (doc.opportunityId) {
    entityType = "opportunity";
    entityId = doc.opportunityId;
  }
  if (doc.projectId) {
    entityType = "project";
    entityId = doc.projectId;
  }
  if (doc.purchaseOrderId) {
    entityType = "purchaseOrder";
    entityId = doc.purchaseOrderId;
  }
  if (doc.taskId) {
    entityType = "task";
    entityId = doc.taskId;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new activity", entityType, entityId);
  }
});

Activities.after.update(function(userId, doc, fieldNames, modifier, options) {
  var entityType;
  var entityId;
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  if (doc.companyId) {
    entityType = "company";
    entityId = doc.companyId;
  }
  if (doc.contactId) {
    entityType = "contact";
    entityId = doc.contactId;
  }
  if (doc.opportunityId) {
    entityType = "opportunity";
    entityId = doc.opportunityId;
  }
  if (doc.projectId) {
    entityType = "project";
    entityId = doc.projectId;
  }
  if (doc.purchaseOrderId) {
    entityType = "purchaseOrder";
    entityId = doc.purchaseOrderId;
  }
  if (doc.taskId) {
    entityType = "task";
    entityId = doc.taskId;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    if (doc.type !== this.previous.type) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated an activity's type from " + this.previous.type + " to " + doc.type, entityType, entityId);
    }
    if (doc.notes !== this.previous.notes) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated an activity's notes", entityType, entityId);
    }
    if (doc.activityTimestamp !== this.previous.activityTimestamp) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated an activity's timestamp", entityType, entityId);
    }
  }
}, {
  fetchPrevious: true
});

Activities.after.remove(function(userId, doc) {
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  var entityType;
  var entityId;
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  if (doc.companyId) {
    entityType = "company";
    entityId = doc.companyId;
  }
  if (doc.contactId) {
    entityType = "contact";
    entityId = doc.contactId;
  }
  if (doc.opportunityId) {
    entityType = "opportunity";
    entityId = doc.opportunityId;
  }
  if (doc.projectId) {
    entityType = "project";
    entityId = doc.projectId;
  }
  if (doc.purchaseOrderId) {
    entityType = "purchaseOrder";
    entityId = doc.purchaseOrderId;
  }
  if (doc.taskId) {
    entityType = "task";
    entityId = doc.taskId;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted an activity", entityType, entityId);
  }
});