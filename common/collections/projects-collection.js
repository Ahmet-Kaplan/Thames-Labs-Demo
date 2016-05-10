Collections.projects = Projects = new Mongo.Collection('projects');

Partitioner.partitionCollection(Projects);

Projects.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    var collectionsToFilter = getDisallowedPermissions(Meteor.userId());

    return Activities.find({
      projectId: this._id,
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
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      projectId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

Tags.TagsMixin(Projects);

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.projects.filters = {
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
      }
      return 'N/A';
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
      }
      return 'N/A';
    }
  },
  manager: {
    display: 'Manager:',
    prop: 'manager',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    displayValue: function(user) {
      if (user) {
        return user.profile.name;
      }
      return 'N/A';
    }
  },
  dueDate: {
    display: 'Due Date:',
    prop: 'dueDate',
    verify: function(dueDate) {
      var wordedTimes = Collections.helpers.wordedTimes;
      if (!moment(dueDate).isValid() && !moment(dueDate, 'DD-MM-YYYY', false).isValid() && !_.some(wordedTimes, 'expr', dueDate.toLowerCase())) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove after/before if set
      if (Collections.projects.index.getComponentDict().get('searchOptions').props && Collections.projects.index.getComponentDict().get('searchOptions').props.after) {
        Collections.projects.index.getComponentMethods().removeProps('after');
      }
      if (Collections.projects.index.getComponentDict().get('searchOptions').props && Collections.projects.index.getComponentDict().get('searchOptions').props.before) {
        Collections.projects.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(Collections.helpers.wordedTimes, function(obj) {
        return obj.expr;
      });
    }
  },
  before: {
    display: 'Due Before:',
    prop: 'before',
    verify: function(date) {
      var afterOption = (Collections.projects.index.getComponentDict().get('searchOptions').props) ? Collections.projects.index.getComponentDict().get('searchOptions').props.after : null;
      if (!moment(date).isValid() && !moment(date, 'DD-MM-YYYY', false).isValid()) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error('The \'Before\' date is before the \'After\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (Collections.projects.index.getComponentDict().get('searchOptions').props && Collections.projects.index.getComponentDict().get('searchOptions').props.dueDate) {
        Collections.projects.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  after: {
    display: 'Due After:',
    prop: 'after',
    verify: function(date) {
      var beforeOption = ((Collections.projects.index.getComponentDict().get('searchOptions').props)) ? Collections.projects.index.getComponentDict().get('searchOptions').props.before : null;
      if (!moment(date).isValid() && !moment(date, 'DD-MM-YYYY', false).isValid()) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error('The \'After\' date is after the \'Before\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (Collections.projects.index.getComponentDict().get('searchOptions').props && Collections.projects.index.getComponentDict().get('searchOptions').props.dueDate) {
        Collections.projects.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'projects'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Project Identifier:',
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

Collections.projects.index = ProjectsIndex = new EasySearch.Index({
  collection: Projects,
  fields: ['name'],

  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadProjects']);
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
        }
      }
      return {
        'name': 1,
        'value': 1,
        'tags': 1,
        'companyId': 1,
        'contactId': 1,
        'active': 1,
        'sequencedIdentifier': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
      }

      if (options.search.props.showArchived) {
        selector.active = false;
      } else {
        selector.active = {
          $ne: false
        };
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
        var dueDate = options.search.props.dueDate;
        var wordedTimes = Collections.helpers.wordedTimes;
        var formattedStartDate = null;
        var formattedEndDate = null;

        if (moment(dueDate).isValid()) {
          formattedStartDate = moment(dueDate).startOf('day').toDate();
          formattedEndDate = moment(dueDate).endOf('day').toDate();
        } else if (moment(dueDate, 'DD-MM-YYYY', false).isValid()) {
          formattedStartDate = moment(dueDate, 'DD-MM-YYYY', false).startOf('day').toDate();
          formattedEndDate = moment(dueDate, 'DD-MM-YYYY', false).endOf('day').toDate();
        } else if (_.some(wordedTimes, 'expr', dueDate.toLowerCase())) {
          var index = _.findIndex(wordedTimes, 'expr', dueDate.toLowerCase());
          formattedStartDate = wordedTimes[index].start.toDate();
          formattedEndDate = wordedTimes[index].end.toDate();
        }

        if (formattedStartDate && formattedEndDate) {
          selector.dueDate = {
            $gte: formattedStartDate,
            $lte: formattedEndDate
          }
        }

      }

      if (options.search.props.after || options.search.props.before) {
        var dueAfter = options.search.props.after;
        var dueBefore = options.search.props.before;
        var startDate = null;
        var endDate = null;
        selector.dueDate = {};

        if (dueAfter && moment(dueAfter).isValid()) {
          startDate = moment(dueAfter).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        } else if (dueAfter && moment(dueAfter, 'DD-MM-YYYY', false).isValid()) {
          startDate = moment(dueAfter, 'DD-MM-YYYY', false).startOf('day').toDate();
          selector.dueDate.$gte = startDate;
        }

        if (dueBefore && moment(dueBefore).isValid()) {
          endDate = moment(dueBefore).endOf('day').toDate();
          selector.dueDate.$lte = endDate;
        } else if (dueBefore && moment(dueBefore, 'DD-MM-YYYY', false).isValid()) {
          endDate = moment(dueBefore, 'DD-MM-YYYY', false).endOf('day').toDate();
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
Projects.before.insert(function(userId, doc) {
  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    var user = Meteor.users.findOne(userId);
    var tenant = Tenants.findOne(user.group);
    doc.sequencedIdentifier = tenant.settings.project.defaultNumber;
  }
});

Projects.after.insert(function(userId, doc) {
  logEvent('info', 'A new project has been created: ' + doc.description);

  if (Meteor.isServer) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    var tenant = Tenants.findOne({
      _id: user.group
    });

    if (!Roles.userIsInRole(userId, ['superadmin'])) {

      Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'project', function(err, res) {
        if (err) throw new Meteor.Error(err);
        _.each(res, function(ex) {
          CustomFields.insert({
            name: ex.name,
            value: (ex.value ? ex.value : ''),
            defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
            type: ex.type,
            global: true,
            order: ex.order,
            target: 'project',
            listValues: '',
            entityId: doc._id
          });
        });
      });
    }

    if (doc._groupId) {
      Tenants.update({
        _id: doc._groupId
      }, {
        $inc: {
          'settings.project.defaultNumber': 1
        }
      });
    }
  }
});

Projects.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing project has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description);
  }
  if (doc.companyId !== this.previous.companyId) {
    var newComp = Companies.findOne(doc.companyId);
    logEvent('info', 'An existing project has been updated: The value of "companyId" was changed from ' + this.previous.companyId + ' (' + this.previous.name + ") to " + doc.companyId + ' (' + newComp.name + ')');
  }
  if (doc.contactId !== this.previous.contactId) {
    var prevCont = Contacts.findOne(this.previous.contactId);
    var newCont = Contacts.findOne(doc.contactId);
    logEvent('info', 'An existing project has been updated: The value of "contactId" was changed from ' + this.previous.contactId + ' (' + prevCont.forename + " " + prevCont.surname + ") to " + doc.contactId + ' (' + newCont.forename + " " + newCont.surname + ')');
  }
  if (doc.userId !== this.previous.userId) {
    var prevUser = Meteor.users.findOne(this.previous.userId);
    var newUser = Meteor.users.findOne(doc.userId);
    logEvent('info', 'An existing project has been updated: The value of "userId" was changed from ' + this.previous.userId + ' (' + prevUser.profile.name + ") to " + doc.userId + ' (' + newUser.profile.name + ')');
  }
  if (doc.value !== this.previous.value) {
    logEvent('info', 'An existing project has been updated: The value of "value" was changed from ' + this.previous.value + " to " + doc.value);
  }
  if (doc.active !== this.previous.active) {
    logEvent('info', 'An existing project has been updated: The value of "active" was changed from ' + this.previous.active + " to " + doc.active);
  }
});

Projects.after.remove(function(userId, doc) {
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  logEvent('info', 'A project has been deleted: ' + doc.description);
});