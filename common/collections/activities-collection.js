import {
  wordedTimes, getWordedTime, getEuropeanDate
}
from '/imports/api/collections-helpers/time-filters.js';
import { Projects, PurchaseOrders } from '/imports/api/collections.js';

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
  },
  activityDate: {
    display: 'Activity Date:',
    prop: 'activityDate',
    verify: function(activityDate) {
      if (!getEuropeanDate(activityDate) && !getWordedTime(activityDate)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove dateBefore/dateAfter if set
      if (_.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.after')) {
        Collections.activities.index.getComponentMethods().removeProps('after');
      }
      if (_.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.before')) {
        Collections.activities.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(_.filter(wordedTimes, (word) => word.position === 'present' || word.position === 'past'), 'expr');
    }
  },
  before: {
    display: 'Date Before:',
    prop: 'before',
    verify: function(date) {
      const afterOption = _.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.after');
      if (!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error(`The 'Before' date is before the 'After' date`, 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove activityDate if set
      } else if (_.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.activityDate')) {
        Collections.activities.index.getComponentMethods().removeProps('activityDate');
      }
      return true;
    }
  },
  after: {
    display: 'Date After:',
    prop: 'after',
    verify: function(date) {
      const beforeOption = _.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.before');
      if (!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error(`The 'After' date is after the 'Before' date`, 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove activityDate if set
      } else if (_.get(Collections.activities.index.getComponentDict().get('searchOptions'), 'props.activityDate')) {
        Collections.activities.index.getComponentMethods().removeProps('activityDate');
      }
      return true;
    }
  },
  recordTypes: {
    display: 'Record Types:',
    prop: 'recordTypes',
    defaultOptions: function() {
      return _.filter(['Companies', 'Contacts', 'Opportunities', 'Projects', 'Purchase Orders'],
        (type) => !_.includes(getDisallowedPermissions(Meteor.userId()), _.toLower(_.replace(type, ' ', '')))
      );
    },
    strict: true,
    allowMultiple: true,
    verify: function(type) {
      return _.includes(this.defaultOptions(), type);
    }
  }
};


////////////////////
// SEARCH INDICES //
////////////////////

Collections.activities.index = ActivitiesIndex = new EasySearch.Index({
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