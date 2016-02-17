Collections.companies = Companies = new Mongo.Collection('companies');

Collections.companies.subscribeById = 'CompanyById';

Partitioner.partitionCollection(Companies);

Companies.helpers({
  contacts: function() {
    return Contacts.find({
      companyId: this._id
    });
  },
  activities: function() {
    var collectionsToFilter = GetDisallowedPermissions(Meteor.userId());

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
  projects: function() {
    return Projects.find({
      companyId: this._id
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

Tags.TagsMixin(Companies);

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.companies.filters = {
  city: {
    display: 'City:',
    prop: 'city',
    allowMultiple: true,
    verify: function(city) {
      if (!city) return false;
      return true;
    }
  },
  country: {
    display: 'Country:',
    prop: 'country',
    allowMultiple: true,
    verify: function(country) {
      if (!country) return false;
      return true;
    }
  },
  postcode: {
    display: 'Postcode:',
    prop: 'postcode',
    allowMultiple: true,
    verify: function(postcode) {
      if (!postcode) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'companies'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Company Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  }
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.companies.index = CompaniesIndex = new EasySearch.Index({
  collection: Companies,
  fields: ['name'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadCompanies']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'name': 1
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      if (options.search.props.autosuggest) {
        return {
          'name': 1,
          'city': 1
        }
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
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier);
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
        }
      }

      if (options.search.props.postcode) {
        // n.b. list is a comma separated string
        selector.postcode = {
          $in: _.map(options.search.props.postcode.split(','), function(postcode) {
            return new RegExp(postcode, 'i');
          })
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

Companies.before.insert(function(userId, doc) {
  if (doc.website) {
    var currentWebsite = doc.website;
    if (currentWebsite.indexOf('http://') === -1) {
      if (currentWebsite.indexOf('https://') === -1) {
        doc.website = "http://" + currentWebsite;
      }
    }
  }

  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    var user = Meteor.users.findOne(userId);
    var tenant = Tenants.findOne(user.group);
    var companyCustomFields = tenant.settings.extInfo.company;

    var cfMaster = [];
    _.each(companyCustomFields, function(cf) {
      var field = {
        dataName: cf.name,
        dataValue: cf.defaultValue,
        dataType: cf.type,
        isGlobal: true
      };

      cfMaster.push(field);
    });
    doc.extendedInformation = cfMaster;
    doc.sequencedIdentifier = Tenants.findOne({}).settings.company.defaultNumber;
  }

  return true;
});

Companies.after.insert(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A new company has been created: ' + doc.name);

  if (Meteor.isServer) {
    var t = Tenants.findOne({});
    Tenants.update({
      _id: t._id
    }, {
      $inc: {
        'settings.company.defaultNumber': 1
      }
    });
  }
});

Companies.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (this.previous.website !== doc.website && doc.website !== '') {
    Meteor.call('getClearbitData', 'company', doc._id);
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing company has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  if (doc.address !== this.previous.address) {
    logEvent('info', 'An existing company has been updated: The value of "address" was changed from ' + this.previous.address + " to " + doc.address);
  }
  if (doc.address2 !== this.previous.address2) {
    logEvent('info', 'An existing company has been updated: The value of "address2" was changed from ' + this.previous.address2 + " to " + doc.address2);
  }
  if (doc.city !== this.previous.city) {
    logEvent('info', 'An existing company has been updated: The value of "city" was changed from ' + this.previous.city + " to " + doc.city);
  }
  if (doc.county !== this.previous.county) {
    logEvent('info', 'An existing company has been updated: The value of "county" was changed from ' + this.previous.county + " to " + doc.county);
  }
  if (doc.postcode !== this.previous.postcode) {
    logEvent('info', 'An existing company has been updated: The value of "postcode" was changed from ' + this.previous.postcode + " to " + doc.postcode);
  }
  if (doc.country !== this.previous.country) {
    logEvent('info', 'An existing company has been updated: The value of "country" was changed from ' + this.previous.country + " to " + doc.country);
  }
  if (doc.website !== this.previous.website) {
    logEvent('info', 'An existing company has been updated: The value of "website" was changed from ' + this.previous.website + " to " + doc.website);
  }
  if (doc.phone !== this.previous.phone) {
    logEvent('info', 'An existing company has been updated: The value of "phone" was changed from ' + this.previous.phone + " to " + doc.phone);
  }
  if (doc.companiesHouseId !== this.previous.companiesHouseId) {
    logEvent('info', 'An existing company has been updated: The value of "Companies House record" was changed from ' + this.previous.companiesHouseId + " to " + doc.companiesHouseId);
  }
}, {
  fetchPrevious: true
});

Companies.after.remove(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A company has been deleted: ' + doc.name);
});