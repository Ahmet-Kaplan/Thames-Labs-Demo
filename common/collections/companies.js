Collections.companies = Companies = new Mongo.Collection('companies');

Partitioner.partitionCollection(Companies);

Companies.helpers({
  contacts: function() {
    return Contacts.find({
      companyId: this._id
    });
  },
  activities: function() {
    return Activities.find({
      companyId: this._id
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
// SEARCH INDICES //
////////////////////

Companies.initEasySearch(['name', 'tags'], {
  limit: 20,
  use: 'mongo-db',
  sort: function() {
    return {
      'name': 1
    };
  },
  returnFields: [
    'name',
    'city',
    'country',
    'website',
    'tags'
  ]
});

EasySearch.createSearchIndex('autosuggestCompany', {
  field: ['_id', 'name'],
  collection: Companies,
  limit: 10,
  use: 'mongo-db',
  returnFields: ['_id', 'name']
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Companies.after.insert(function(userId, doc) {
  logEvent('info', 'A new company has been created: ' + doc.name);
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
}, {
  fetchPrevious: true
});

Companies.after.remove(function(userId, doc) {
  logEvent('info', 'A company has been deleted: ' + doc.name);
});
