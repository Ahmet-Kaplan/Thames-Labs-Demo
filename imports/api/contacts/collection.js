import { Activities, Companies, CustomFields, Tenants } from '/imports/api/collections.js';
import { ContactSchema } from './schema.js';
import { ContactFilters } from './filters.js';

export const Contacts = new Mongo.Collection('contacts');

Partitioner.partitionCollection(Contacts);

Contacts.attachSchema(ContactSchema);


Contacts.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateContacts').apply();
Contacts.permit(['update']).ifLoggedIn().ifHasRole('CanEditContacts').apply();
Contacts.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteContacts').apply();

Tags.TagsMixin(Contacts);
Contacts.allowTags(function(userId) {
  return !!userId;
});

Contacts.helpers({
  name: function() {
    return [this.forename, this.surname].join(' ');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    const collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      contactId: this._id,
      primaryEntityType: {
        $nin: collectionsToFilter
      }
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
});

////////////////////
// SEARCH FILTERS //
////////////////////

Contacts.filters = ContactFilters;

////////////////////
// SEARCH INDICES //
////////////////////

Contacts.index = new EasySearch.Index({
  collection: Contacts,
  fields: ['forename', 'surname'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadContacts']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'name_sort': 1, 'surname': 1, 'forename': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      if (options.search.props.autosuggest) {
        return {
          'forename': 1,
          'surname': 1
        };
      }
      return {
        'forename': 1,
        'surname': 1,
        'jobtitle': 1,
        'companyId': 1,
        'phone': 1,
        'mobile': 1,
        'email': 1,
        'tags': 1,
        'sequencedIdentifier': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
      }

      if (options.search.props.filterCompanyId) {
        selector.companyId = options.search.props.filterCompanyId;
      }

      if (options.search.props.company) {
        // n.b. the array is passed as a comma separated string
        selector.companyId = {
          $in: options.search.props.company.split(',')
        };
      }

      if (options.search.props.forename) {
        selector.forename = {
          $regex: '^' + options.search.props.forename,
          $options: 'i'
        };
      }

      if (options.search.props.surname) {
        selector.surname = {
          $regex: '^' + options.search.props.surname,
          $options: 'i'
        };
      }

      if (options.search.props.phone) {
        // n.b. the array is passed as a comma separated string
        selector.phone = {
          $in: _.map(options.search.props.phone.split(','), function(phone) {
            return new RegExp(phone, 'i');
          })
        };
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      return selector;
    },
    transform: (doc) => {
      doc.name = [doc.forename, doc.surname].join(' ');
      return doc;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Contacts.before.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (doc.companyId && doc.companyId.indexOf('newRecord') !== -1) {
    var name = doc.companyId.substr(9);
    var newCompanyId = Companies.insert({
      name: name,
      createdBy: Meteor.userId()
    });
    doc.companyId = newCompanyId;
    if (Meteor.isClient) {
      toastr.info('A new company <a href="/companies/' + newCompanyId + '"><strong>' + name + '</strong></a> has been created.');
    }
  }

  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    var user = Meteor.users.findOne(userId);
    var tenant = Tenants.findOne(user.group);
    doc.sequencedIdentifier = tenant.settings.contact.defaultNumber;
  }

});

Contacts.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " created a new contact", 'contact', doc._id);
  }

  if (Meteor.isServer) {
    if (user) {
      var tenant = Tenants.findOne({
        _id: user.group
      });
      if (tenant) {
        if (!Roles.userIsInRole(userId, ['superadmin'])) {
          Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'contact', function(err, res) {
            if (err) throw new Meteor.Error(err);
            _.each(res, function(ex) {
              CustomFields.insert({
                name: ex.name,
                value: (ex.value ? ex.value : ''),
                defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                type: ex.type,
                global: true,
                order: ex.order,
                target: 'contact',
                listValues: '',
                entityId: doc._id
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Warning, "An error occurred whilst instanciating the global custom field '" + ex.name + "': " + err, 'contact', doc._id);
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
          'settings.contact.defaultNumber': 1
        }
      }, function(err) {
        if (err) {
          LogServerEvent(LogLevel.Error, "An error occurred whilst updating the tenant's ID contact value: " + err, 'tenant', doc._groupId);
          return;
        }
      });
    }

    if(doc.companyId && !doc.address && !doc.city && !doc.county && !doc.postcode && !doc.country) {
      const company = Companies.findOne({_id: doc.companyId});
      if(company) {
        if (company.address) Contacts.update({_id: doc._id}, {$set: {address: company.address}});
        if (company.city) Contacts.update({_id: doc._id}, {$set: {city: company.city}});
        if (company.county) Contacts.update({_id: doc._id}, {$set: {county: company.county}});
        if (company.postcode) Contacts.update({_id: doc._id}, {$set: {postcode: company.postcode}});
        if (company.country) Contacts.update({_id: doc._id}, {$set: {country: company.country}});
      }
    }
  }
});

Contacts.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });

  if (user) {
    if (this.previous.email !== doc.email && doc.email !== '' && doc.email !== null) {
      Meteor.call('clearbit.getClearbitData', 'contact', doc._id);
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's public information", 'contact', doc._id);
    }
    if (doc.forename !== this.previous.forename) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's forename", 'contact', doc._id);
    }
    if (doc.surname !== this.previous.surname) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's surname", 'contact', doc._id);
    }
    if (doc.email !== this.previous.email) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's email address", 'contact', doc._id);
    }
    if (doc.phone !== this.previous.phone) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's telephone number", 'contact', doc._id);
    }
    if (doc.mobile !== this.previous.mobile) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's mobile phone number", 'contact', doc._id);
    }
    if (doc.jobtitle !== this.previous.jobtitle) {
      LogClientEvent(LogLevel.Info, user.profile.name + " updated a contact's job title", 'contact', doc._id);
    }
  }
});

Contacts.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  if (user) {
    LogClientEvent(LogLevel.Info, user.profile.name + " deleted contact '" + doc.forena + " " + doc.surname + "'", null, null);
  }
});
