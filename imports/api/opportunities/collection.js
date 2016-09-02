import { Activities, Companies, Contacts, Tenants } from '/imports/api/collections.js';
import { OpportunitySchema } from './schema.js';
import { OpportunityFilters } from './filters.js';

export const Opportunities = new Mongo.Collection('opportunities');

Opportunities.attachSchema(OpportunitySchema);

Partitioner.partitionCollection(Opportunities);

Tags.TagsMixin(Opportunities);

Opportunities.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateOpportunities').apply();
Opportunities.permit(['update']).ifLoggedIn().ifHasRole('CanEditOpportunities').apply();
Opportunities.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteOpportunities').apply();
Opportunities.allowTags(function(userId) {
  return !!userId;
});


Opportunities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  activities: function() {
    const collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      opportunityId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  }
});

////////////////////
// SEARCH FILTERS //
////////////////////

Opportunities.filters = OpportunityFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Opportunities.index = OpportunitiesIndex = new EasySearch.Index({
  collection: Opportunities,
  fields: ['name', 'tags'],

  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadOpportunities']);
  },
  engine: new EasySearch.MongoDB({
    sort: (searchObject, options) => {
      if (options.search.props.sortByCloseDate) {
        return {
          'estCloseDate': 1
        };
      } else if (options.search.props.sortByValue) {
        return {
          'value': -1
        };
      }
      return {
        'name': 1
      };
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      return {
        'name': 1,
        'companyId': 1,
        'contactId': 1,
        'value': 1,
        'estCloseDate': 1,
        'isArchived': 1,
        'hasBeenWon': 1,
        'reasonLost': 1,
        'tags': 1,
        'currentStageId': 1,
        'sequencedIdentifier': 1,
        'salesManagerId': 1
      };
    },
    selector: function(searchObject, options, aggregation, userId, doc) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.salesManager) {
        // n.b. the array is passed as a comma separated string
        selector.salesManagerId = {
          $in: options.search.props.salesManager.split(',')
        };
      }

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
      }

      if (options.search.props.state) {
        if(options.search.props.state === "Won") {
          selector.hasBeenWon = true;
        } else if(options.search.props.state === "Lost") {
          selector.hasBeenWon = false;
        } else {
          selector.hasBeenWon = {
            $exists: false
          };
        }
      }

      if (options.search.props.nextAction) {
        if(options.search.props.nextAction === "Overdue") {
          selector.nextActionDue = {
            $lt: moment().toDate()
          };
        } else if(options.search.props.nextAction === "Due Today") {
          var startToday = new Date(moment().year(), moment().month(), moment().date(), '0', '0', '0');
          var endToday = new Date(moment().year(), moment().month(), moment().date(), '23', '59', '59');
          selector.nextActionDue = {
            $gte: startToday,
            $lt: endToday
          };
        } else {
          selector.nextActionDue = {
            $exists: false
          };
        }
      }

      if (options.search.props.archived) {
        if(options.search.props.archived === "Yes") {
          selector.isArchived = true;
        } else {
          selector.isArchived = {
            $ne: true
          };
        }
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.companyId = {
          $in: options.search.props.company.split(',')
        };
      }

      if (options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.contactId = {
          $in: options.search.props.contact.split(',')
        };
      }

      if (options.search.props.stage) {
        var user = Meteor.users.findOne(userId);
        var tenant = Tenants.findOne(user.group);
        var stages = options.search.props.stage.split(',');
        var ids = [];

        _.each(stages, function(x) {
          var id = _.find(tenant.settings.opportunity.stages, function(y) {
            return y.title === x;
          }).id;
          ids.push(id);
        });

        selector.currentStageId = {
          $in: ids
        };
      }

      if (options.search.props.valueLower || options.search.props.valueGreater) {
        selector.value = {};
        var lowerThan = parseInt(options.search.props.valueLower, 10);
        var greaterThan = parseInt(options.search.props.valueGreater, 10);

        if (!isNaN(lowerThan)) {
          selector.value.$lte = lowerThan;
        }

        if (!isNaN(greaterThan)) {
          selector.value.$gte = greaterThan;
        }
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
Opportunities.before.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  doc.currentStageId = 0;

  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    doc.sequencedIdentifier = Tenants.findOne({
      _id: doc._groupId
    }).settings.opportunity.defaultNumber;
  }
});

Opportunities.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new opportunity", 'opportunity', doc._id);
  }

  if (Meteor.isServer) {
    if (doc._groupId) {
      Tenants.update({
        _id: doc._groupId
      }, {
        $inc: {
          'settings.opportunity.defaultNumber': 1
        }
      }, function(err) {
        if (err) {
          LogServerEvent(LogLevel.Error, "An error occurred whilst updating the tenant's RealTime ID opportunity value: " + err, 'tenant', doc._groupId);
          return;
        }
      });
    }
  }
});

Opportunities.before.update(function(userId, doc, fieldNames, modifier, options) {
  if(modifier.$set) {
    if(!!modifier.$set.estCloseDate === false) {
      modifier.$set.estCloseDate = null;
    }
  }
});

Opportunities.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  const user = Meteor.user();

  if (user) {
    // Add activity log entry on opportunity stage update
    if ( _.includes(fieldNames, 'currentStageId') ) {
      const date = new Date(),
            userName = _.get(user, 'profile.name'),
            tenant = Tenants.findOne(Meteor.user().group),
            stages = _.get(tenant, 'settings.opportunity.stages'),
            previousStageTitle = _.chain(stages)
              .find({id: this.previous.currentStageId})
              .get('title')
              .value(),
            stageTitle = _.chain(stages)
              .find({id: doc.currentStageId})
              .get('title')
              .value(),
            note = `${userName} moved this opportunity from stage "${previousStageTitle}" to "${stageTitle}"`;
      if(!!previousStageTitle && !!stageTitle) {
        Activities.insert({
          type: 'Note',
          notes: note,
          createdAt: date,
          activityTimestamp: date,
          opportunityId: doc._id,
          primaryEntityId: doc._id,
          primaryEntityType: 'opportunities',
          primaryEntityDisplayData: doc.name,
          createdBy: user._id
        });
      }
    }

    if (doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated an opportunity's description`, 'opportunity', doc._id);
    }
    if (doc.name !== this.previous.name) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated an opportunity's name`, 'opportunity', doc._id);
    }
  }
});

Opportunities.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  const user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted opportunity '" + doc.name + "'", null, null);
  }
});
