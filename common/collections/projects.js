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

ProjectsIndex = new EasySearch.Index({
  collection: Projects,
  fields: ['name', 'tags'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'name': 1 }
    },
    fields: () => {
      return {
        'name': 1,
        'value': 1,
        'tags': 1,
        'companyId': 1,
        'contactId': 1
      }
    }
  })
});

// EasySearch.createSearchIndex('autosuggestProject', {
//   field: ['_id', 'name'],
//   collection: Projects,
//   limit: 10,
//   use: 'mongo-db',
//   props: {
//     supplierCompanyId: '',
//     supplierContactId: ''
//   },
//   query: function(searchString) {
//     var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
//
//     if (this.props.supplierCompanyId.length > 0) {
//       query.companyId = {
//         $eq: this.props.supplierCompanyId
//       };
//     } else {
//       query.contactId = {
//         $eq: this.props.supplierContactId
//       };
//     }
//     return query;
//   },
//   returnFields: ['_id', 'name']
// });

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
