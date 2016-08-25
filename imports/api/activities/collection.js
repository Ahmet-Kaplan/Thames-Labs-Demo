import { getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';
import { Companies, Projects, PurchaseOrders, Tasks } from '/imports/api/collections.js';
import { ActivitySchema } from './schema.js';
import { ActivityFilters } from './filters.js';

export const Activities = new Mongo.Collection('activities');

Activities.attachSchema(ActivitySchema);

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

Activities.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
Activities.allowTags(function(userId) {
  return !!userId;
});


////////////////////
// SEARCH FILTERS //
////////////////////

Activities.filters = ActivityFilters;


////////////////////
// SEARCH INDICES //
////////////////////

Activities.index = new EasySearch.Index({
  collection: Activities,
  fields: ['type', 'notes', 'primaryEntityDisplayData'],
  engine: new EasySearch.MongoDB({
    sort: () => ({
      'activityTimestamp': -1
    }),
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

      if (options.search.props.activityDate) {
        const activityDate = options.search.props.activityDate;
        const europeanActivityDate = getEuropeanDate(activityDate);
        const wordedDate = getWordedTime(activityDate);
        let formattedStartDate = null;
        let formattedEndDate = null;

        if (europeanActivityDate) {
          formattedStartDate = moment(europeanActivityDate).startOf('day').toDate();
          formattedEndDate = moment(europeanActivityDate).endOf('day').toDate();
        } else if (wordedDate) {
          formattedStartDate = wordedDate.start.toDate();
          formattedEndDate = wordedDate.end.toDate();
        }

        if (formattedStartDate && formattedEndDate) {
          selector.activityTimestamp = {
            $gte: formattedStartDate,
            $lte: formattedEndDate,
            $ne: null
          };
        }

      }

      if (options.search.props.after || options.search.props.before) {
        const dateAfter = options.search.props.after;
        const dateAfterMoment = getEuropeanDate(dateAfter);
        const dateBefore = options.search.props.before;
        const dateBeforeMoment = getEuropeanDate(dateBefore);
        let startDate = null;
        let endDate = null;
        selector.activityTimestamp = {
          $ne: null
        };

        if (dateAfter && dateAfterMoment) {
          startDate = moment(dateAfterMoment).startOf('day').toDate();
          selector.activityTimestamp.$gte = startDate;
        }

        if (dateBefore && dateBeforeMoment) {
          endDate = moment(dateBeforeMoment).endOf('day').toDate();
          selector.activityTimestamp.$lte = endDate;
        }
      }

      const collectionsToFilter = getDisallowedPermissions(options.search.userId);

      selector.primaryEntityType = {
        $nin: collectionsToFilter
      };

      // Needs to be declared AFTER the collectionsToFilter restriction
      if (options.search.props.recordTypes) {
        const activeTypes = _.map(options.search.props.recordTypes.split(','), (type) => _.toLower(_.replace(type, ' ', '')));
        selector.primaryEntityType.$in = _.filter(activeTypes, (type) => !_.includes(collectionsToFilter, type));
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

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