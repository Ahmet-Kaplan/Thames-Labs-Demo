Collections.contacts = Contacts = new Mongo.Collection('contacts');

Partitioner.partitionCollection(Contacts);

Contacts.helpers({
  name: function() {
    return [this.forename, this.surname].join(' ');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    return Activities.find({
      contactId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      supplierContactId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

Tags.TagsMixin(Contacts);

////////////////////
// SEARCH INDICES //
////////////////////

ContactsIndex = new EasySearch.Index({
  collection: Contacts,
  fields: ['forename', 'surname', 'tags'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'surname': 1 }
    },
    fields: (searchObject, options) => {
      if (options.search.props.autosuggest) {
        return {
          'forename': 1,
          'surname': 1
        }
      }
      return {
        'forename': 1,
        'surname': 1,
        'jobtitle': 1,
        'companyId': 1,
        'phone': 1,
        'mobile': 1,
        'email': 1,
        'tags': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.filterCompanyId) {
        selector.companyId = options.search.props.filterCompanyId;
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

var checkRecordsNumber = Collections.helpers.checkRecordsNumber;

Contacts.before.insert(function(userId, doc) {
  if (!checkRecordsNumber()) {
    return false;
  }

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
    var contactCustomFields = tenant.settings.extInfo.contact;

    var cfMaster = {};
    _.each(contactCustomFields, function(cf) {

      var field = {
        dataValue: cf.defaultValue,
        dataType: cf.type,
        isGlobal: true
      };

      cfMaster[cf.name] = field;
    });

    doc.customFields = cfMaster;
  }
});

Contacts.after.insert(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A new contact has been created: ' + doc.forename + " " + doc.surname);
});

Contacts.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (this.previous.email !== doc.email && doc.email !== '' && doc.email !== undefined) {
    Meteor.call('getClearbitData', 'contact', doc._id);
  }
  if (doc.forename !== this.previous.forename) {
    logEvent('info', 'An existing contact has been updated: The value of "forename" was changed from ' + this.previous.forename + " to " + doc.forename);
  }
  if (doc.surname !== this.previous.surname) {
    logEvent('info', 'An existing contact has been updated: The value of "surname" was changed from ' + this.previous.surname + " to " + doc.surname);
  }
  if (doc.email !== this.previous.email) {
    logEvent('info', 'An existing contact has been updated: The value of "email" was changed from ' + this.previous.email + " to " + doc.email);
  }
  if (doc.phone !== this.previous.phone) {
    logEvent('info', 'An existing contact has been updated: The value of "phone" was changed from ' + this.previous.phone + " to " + doc.phone);
  }
  if (doc.mobile !== this.previous.mobile) {
    logEvent('info', 'An existing contact has been updated: The value of "mobile" was changed from ' + this.previous.mobile + " to " + doc.mobile);
  }
  if (doc.jobtitle !== this.previous.jobtitle) {
    logEvent('info', 'An existing contact has been updated: The value of "jobtitle" was changed from ' + this.previous.jobtitle + " to " + doc.jobtitle);
  }
  if (doc.companyId !== this.previous.companyId) {
    var prevComp = Companies.findOne(this.previous.companyId);
    var newComp = Companies.findOne(doc.companyId);
    if (prevComp === undefined) {
      var prevComp = {
        name: 'None'
      }
    }
    if (newComp === undefined) {
      var newComp = {
        name: 'None'
      }
    }
    logEvent('info', 'An existing contact has been updated: The value of "companyId" was changed from ' + this.previous.companyId + '(' + prevComp.name + ") to " + doc.companyId + ' (' + newComp.name + ')');
  }
});

Contacts.after.remove(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A contact has been deleted: ' + doc.forename + " " + doc.surname);
});
