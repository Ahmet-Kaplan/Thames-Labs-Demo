import { Activities, Companies, Contacts, CustomFields, PurchaseOrders, Tenants } from '/imports/api/collections.js';
import { getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';

import { JobSchema } from './schema.js';
import { JobFilters } from './filters.js';

export const Jobs = new Mongo.Collection('jobs');

Jobs.attachSchema(JobSchema);
Partitioner.partitionCollection(Jobs);

Tags.TagsMixin(Jobs);

Jobs.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateJobs').apply();
Jobs.permit(['update']).ifLoggedIn().ifHasRole('CanEditJobs').apply();
Jobs.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteJobs').apply();
Jobs.allowTags(function(userId) {
  return !!userId;
});

Jobs.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    const collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      jobId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  }
});

////////////////////
// SEARCH FILTERS //
////////////////////

Jobs.filters = JobFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Jobs.index = JobsIndex = new EasySearch.Index({
  collection: Jobs,
  fields: ['name'],

  permission: function(options) {
    const userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadJobs']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({
      'name': 1
    }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      if (options.search.props.autosuggest) {
        return {
          'name': 1,
        };
      }
      return {
        'name': 1,
        'value': 1,
        'tags': 1,
        'companyId': 1,
        'contactId': 1,
        'active': 1,
        'sequencedIdentifier': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      const selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
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

      if (options.search.props.supplierCompanyId) {
        selector.companyId = options.search.props.supplierCompanyId;
      } else if (options.search.props.supplierContactId) {
        selector.contactId = options.search.props.supplierContactId;
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

      if (options.search.props.active) {
        if(options.search.props.active === "Yes") {
          selector.active = true;
        } else {
          selector.active = {
            $ne: true
          };
        }
      }

      if (options.search.props.valueLower || options.search.props.valueGreater) {
        selector.value = {};
        const lowerThan = parseInt(options.search.props.valueLower, 10);
        const greaterThan = parseInt(options.search.props.valueGreater, 10);

        if (!isNaN(lowerThan)) {
          selector.value.$lte = lowerThan;
        }

        if (!isNaN(greaterThan)) {
          selector.value.$gte = greaterThan;
        }
      }

      if (options.search.props.contact) {
        // n.b. the array is passed as a comma separated string
        selector.contactId = {
          $in: options.search.props.contact.split(',')
        };
      }

      if (options.search.props.manager) {
        // n.b. the array is passed as a comma separated string
        selector.userId = {
          $in: options.search.props.manager.split(',')
        };
      }

      if (options.search.props.dueDate) {
        const dueDate = options.search.props.dueDate;
        const europeanDueDate = getEuropeanDate(dueDate);
        const wordedDate = getWordedTime(dueDate);
        let formattedStartDate = null;
        let formattedEndDate = null;

        if (europeanDueDate) {
          formattedStartDate = moment(europeanDueDate).startOf('day').toDate();
          formattedEndDate = moment(europeanDueDate).endOf('day').toDate();
        } else if (wordedDate) {
          formattedStartDate = wordedDate.start.toDate();
          formattedEndDate = wordedDate.end.toDate();
        }

        if (formattedStartDate && formattedEndDate) {
          selector.dueDate = {
            $gte: formattedStartDate,
            $lte: formattedEndDate,
            $ne: null
          };
        }

      }

      if (options.search.props.after || options.search.props.before) {
        const dueAfter = options.search.props.after;
        const dueAfterMoment = getEuropeanDate(dueAfter);
        const dueBefore = options.search.props.before;
        const dueBeforeMoment = getEuropeanDate(dueBefore);
        let startDate = null;
        let endDate = null;
        selector.dueDate = {
          $ne: null
        };

        if (dueAfter && dueAfterMoment) {
          startDate = moment(dueAfterMoment).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        }

        if (dueBefore && dueBeforeMoment) {
          endDate = moment(dueBeforeMoment).endOf('day').toDate();
          selector.dueDate.$lte = endDate;
        }
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      return selector;
    },
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////
Jobs.before.insert(function(userId, doc) {
  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    const user = Meteor.users.findOne(userId);
    const tenant = Tenants.findOne(user.group);
    doc.sequencedIdentifier = tenant.settings.job.defaultNumber;
  }
});

Jobs.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  const user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    LogClientEvent(LogLevel.Info, `${user.profile.name} created a new job`, 'job', doc._id);
  }

  if (Meteor.isServer) {
    if (user) {
      const tenant = Tenants.findOne({
        _id: user.group
      });
      if (tenant) {
        if (!Roles.userIsInRole(userId, ['superadmin'])) {
          Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'job', function(err, res) {
            if (err) throw new Meteor.Error(err);
            _.each(res, function(ex) {
              CustomFields.insert({
                name: ex.name,
                value: (ex.value ? ex.value : ''),
                defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                type: ex.type,
                global: true,
                order: ex.order,
                target: 'job',
                listValues: '',
                entityId: doc._id
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Warning, `An error occurred whilst instanciating the global custom field '${ex.name}': ${err}`, 'job', doc._id);
                }
              });
            });
          });
        }
      }
    }

    if (doc._groupId) {
      Tenants.update({
        _id: doc._groupId
      }, {
        $inc: {
          'settings.job.defaultNumber': 1
        }
      });
    }
  }
});

Jobs.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  const user = Meteor.user();

  if( _.includes(fieldNames, 'jobMilestoneId')) {
    const date = new Date(),
          userName = _.get(user, 'profile.name'),
          tenant = Tenants.findOne(Meteor.user().group),
          jobTypes = _.get(tenant, 'settings.job.types');

    const jobType = jobTypes[doc.jobTypeId];

    if(jobType) {
      const milestones = jobType.milestones,
            note = `${userName} moved this job to milestone "${milestones[doc.jobMilestoneId].name}"`;
      Activities.insert({
        type: 'Note',
        notes: note,
        createdAt: date,
        activityTimestamp: date,
        jobId: doc._id,
        primaryEntityId: doc._id,
        primaryEntityType: 'jobs',
        primaryEntityDisplayData: doc.name,
        createdBy: user._id
      });
    }
  }

  if (user) {
    if (doc.name !== this.previous.name) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's name`, 'job', doc._id);
    }
    if (doc.description !== this.previous.description) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's description`, 'job', doc._id);
    }
    if (doc.companyId !== this.previous.companyId) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's company`, 'job', doc._id);
    }
    if (doc.contactId !== this.previous.contactId) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's contact`, 'job', doc._id);
    }
    if (doc.userId !== this.previous.userId) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's account manager`, 'job', doc._id);
    }
    if (doc.value !== this.previous.value) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's value`, 'job', doc._id);
    }
    if (doc.active !== this.previous.active) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} updated a job's active state`, 'job', doc._id);
    }
  }
});

Jobs.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  const user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, `${user.profile.name} deleted job '${doc.name}'`, null, null);
  }
});
