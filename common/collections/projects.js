Collections.projects = Projects = new Mongo.Collection('projects');

Partitioner.partitionCollection(Projects);

Projects.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    return Activities.find({
      projectId: this._id
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
// SEARCH INDICES //
////////////////////

Collections.projects.index = ProjectsIndex = new EasySearch.Index({
  collection: Projects,
  fields: ['name', 'tags'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'name': 1 }
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
        'contactId': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.supplierCompanyId) {
        selector.companyId = options.search.props.supplierCompanyId;
      } else if (options.search.props.supplierContactId) {
        selector.contactId = options.search.props.supplierContactId;
      }
      return selector;
    },
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Projects.after.insert(function(userId, doc) {
  logEvent('info', 'A new project has been created: ' + doc.description);
});

Projects.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing project has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description);
  }
  if (doc.companyId !== this.previous.companyId) {
    var prevComp = Companies.findOne(this.previous.companyId);
    var newComp = Companies.findOne(doc.companyId);
    logEvent('info', 'An existing project has been updated: The value of "companyId" was changed from ' + this.previous.companyId + '(' + prevComp.name + ") to " + doc.companyId + ' (' + newComp.name + ')');
  }
  if (doc.contactId !== this.previous.contactId) {
    var prevCont = Contacts.findOne(this.previous.contactId);
    var newCont = Contacts.findOne(doc.contactId);
    logEvent('info', 'An existing project has been updated: The value of "contactId" was changed from ' + this.previous.contactId + '(' + prevCont.forename + " " + prevCont.surname + ") to " + doc.contactId + ' (' + newCont.forename + " " + newCont.surname + ')');
  }
  if (doc.userId !== this.previous.userId) {
    var prevUser = Meteor.users.findOne(this.previous.userId);
    var newUser = Meteor.users.findOne(doc.userId);
    logEvent('info', 'An existing project has been updated: The value of "userId" was changed from ' + this.previous.userId + '(' + prevUser.profile.name + ") to " + doc.userId + ' (' + newUser.profile.name + ')');
  }
  if (doc.value !== this.previous.value) {
    logEvent('info', 'An existing project has been updated: The value of "value" was changed from ' + this.previous.value + " to " + doc.value);
  }
});

Projects.after.remove(function(userId, doc) {
  logEvent('info', 'A project has been deleted: ' + doc.description);
});
