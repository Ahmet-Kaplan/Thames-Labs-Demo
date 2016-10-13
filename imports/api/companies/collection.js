import { Activities, Contacts, CustomFields, Jobs, PurchaseOrders, Tenants } from '/imports/api/collections.js';
import { CompanySchema } from './schema.js';
import { CompanyFilters } from './filters.js';


export const Companies = new Mongo.Collection('companies');

Companies.attachSchema(CompanySchema);

Companies.subscribeById = 'CompanyById';

Partitioner.partitionCollection(Companies);

Companies.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateCompanies').apply();
Companies.permit(['update']).ifLoggedIn().ifHasRole('CanEditCompanies').apply();
Companies.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteCompanies').apply();

Tags.TagsMixin(Companies);
Companies.allowTags(function(userId) {
  return !!userId;
});

Companies.helpers({
  contacts: function() {
    return Contacts.find({
      companyId: this._id
    });
  },
  activities: function() {
    var collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      companyId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  jobs: function() {
    return Jobs.find({
      companyId: this._id,
      active: true
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      supplierCompanyId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});


////////////////////
// SEARCH FILTERS //
////////////////////

Companies.filters = CompanyFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Companies.index = CompaniesIndex = new EasySearch.Index({
  collection: Companies,
  fields: ['name'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadCompanies']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'name_sort': 1, 'name': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      if (options.search.props.autosuggest) {
        return {
          'name': 1,
          'city': 1
        };
      }
      return {
        'name': 1,
        'address': 1,
        'city': 1,
        'postcode': 1,
        'country': 1,
        'website': 1,
        'phone': 1,
        'tags': 1,
        'sequencedIdentifier': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.city) {
        // n.b. list is a comma separated string
        selector.city = {
          $in: _.map(options.search.props.city.split(','), function(city) {
            return new RegExp(city, 'i');
          })
        };
      }

      if (options.search.props.country) {
        // n.b. list is a comma separated string
        selector.country = {
          $in: _.map(options.search.props.country.split(','), function(country) {
            return new RegExp(country, 'i');
          })
        };
      }

      if (options.search.props.postcode) {
        // n.b. list is a comma separated string
        selector.postcode = {
          $in: _.map(options.search.props.postcode.split(','), function(postcode) {
            return new RegExp(postcode, 'i');
          })
        };
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

Companies.before.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  if (doc.website) {
    var currentWebsite = doc.website;
    if (currentWebsite.indexOf('http://') === -1) {
      if (currentWebsite.indexOf('https://') === -1) {
        doc.website = "http://" + currentWebsite;
      }
    }
  }

  var user = Meteor.users.findOne(userId);
  var tenant = Tenants.findOne(user.group);
  doc.sequencedIdentifier = tenant.settings.company.defaultNumber;
  return true;
});

Companies.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;

  var user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new company", 'company', doc._id);
  }
  if (Meteor.isServer) {
    if (user) {
      var tenant = Tenants.findOne({
        _id: user.group
      });
      if (tenant) {
        if (!Roles.userIsInRole(userId, ['superadmin'])) {
          Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'company', function(err, res) {
            if (err) throw new Meteor.Error(err);
            _.each(res, function(ex) {
              CustomFields.insert({
                name: ex.name,
                value: (ex.value ? ex.value : ''),
                defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                type: ex.type,
                global: true,
                order: ex.order,
                target: 'company',
                listValues: (ex.listValues ? ex.listValues : null ),
                entityId: doc._id
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Warning, "An error occurred whilst instanciating the global custom field '" + ex.name + "': " + err, 'company', doc._id);
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
          'settings.company.defaultNumber': 1
        }
      }, function(err) {
        if (err) {
          LogServerEvent(LogLevel.Error, "An error occurred whilst updating the tenant's ID company value: " + err, 'tenant', doc._groupId);
          return;
        }
      });
    }
  }
});

Companies.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    if (this.previous.website !== doc.website && doc.website !== '' && doc.website) {
      Meteor.call('clearbit.getClearbitData', 'company', doc._id);
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's public information", 'company', doc._id);
    }
    if (doc.name !== this.previous.name) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's name", 'company', doc._id);
    }
    if (doc.address !== this.previous.address) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's primary address line", 'company', doc._id);
    }
    if (doc.address2 !== this.previous.address2) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's secondary address line", 'company', doc._id);
    }
    if (doc.city !== this.previous.city) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's city", 'company', doc._id);
    }
    if (doc.county !== this.previous.county) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's county", 'company', doc._id);
    }
    if (doc.postcode !== this.previous.postcode) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's postcode", 'company', doc._id);
    }
    if (doc.country !== this.previous.country) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's country", 'company', doc._id);
    }
    if (doc.website !== this.previous.website) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's website", 'company', doc._id);
    }
    if (doc.phone !== this.previous.phone) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's telephone number", 'company', doc._id);
    }
    if (doc.companiesHouseId !== this.previous.companiesHouseId) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's CompaniesHouse reference", 'company', doc._id);
    }
  }
}, {
  fetchPrevious: true
});

Companies.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted company '" + doc.name + "'", null, null);
  }
});