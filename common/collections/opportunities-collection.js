Collections.opportunities = Opportunities = new Mongo.Collection('opportunities');

Partitioner.partitionCollection(Opportunities);

Opportunities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  activities: function() {
    var collectionsToFilter = getDisallowedPermissions(Meteor.userId());

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
  },
});

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.opportunities.filters = {
  company: {
    display: 'Company:',
    prop: 'company',
    collectionName: 'companies',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'companyById',
    displayValue: function(company) {
      if (company) {
        return company.name;
      } else {
        return 'N/A';
      }
    }
  },
  contact: {
    display: 'Contact:',
    prop: 'contact',
    collectionName: 'contacts',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'contactById',
    displayValue: function(contact) {
      if (contact) {
        return contact.name();
      } else {
        return 'N/A';
      }
    }
  },
  valueLower: {
    display: 'Value <',
    prop: 'valueLower',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  valueGreater: {
    display: 'Value >',
    prop: 'valueGreater',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'opportunities'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Opportunity Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  },
  salesManager: {
    display: 'Sales Manager:',
    prop: 'salesManager',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    displayValue: function(user) {
      if (user) {
        return user.profile.name;
      }
    }
  },
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.opportunities.index = OpportunitiesIndex = new EasySearch.Index({
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
        }
      } else {
        return {
          'name': 1
        }
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
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
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.salesManager) {
        // n.b. the array is passed as a comma separated string
        selector.salesManagerId = {
          $in: options.search.props.salesManager.split(',')
        };
      }

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier);
      }

      if (options.search.props.showArchived) {
        selector.isArchived = true;
      } else {
        selector.isArchived = {
          $ne: true
        };
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

      if (options.search.props.valueLower || options.search.props.valueGreater) {
        selector.value = {};
        var lowerThan = parseInt(options.search.props.valueLower);
        var greaterThan = parseInt(options.search.props.valueGreater);

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

Tags.TagsMixin(Opportunities);

//////////////////////
// COLLECTION HOOKS //
//////////////////////
Opportunities.before.insert(function(userId, doc) {
  doc.currentStageId = 0;

  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    doc.sequencedIdentifier = Tenants.findOne({}).settings.opportunity.defaultNumber;
  }
});

Opportunities.after.insert(function(userId, doc) {
  logEvent('info', 'A new opportunity has been created: ' + doc.name);

  if (Meteor.isServer) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    var t = Tenants.findOne({
      _id: user.group
    });
    
    Tenants.update({
      _id: t._id
    }, {
      $inc: {
        'settings.opportunity.defaultNumber': 1
      }
    });
  }
});
Opportunities.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing opportunity has been updated: The value of "description" was changed');
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing opportunity has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
});
Opportunities.after.remove(function(userId, doc) {
  logEvent('info', 'An opportunity has been deleted: ' + doc.name);
});