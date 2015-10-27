Collections.opportunities = Opportunities = new Mongo.Collection('opportunities');

Partitioner.partitionCollection(Opportunities);

Opportunities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  }
});

////////////////////
// SEARCH INDICES //
////////////////////

OpportunitiesIndex = new EasySearch.Index({
  collection: Opportunities,
  fields: ['name', 'tags'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'name': 1 }
    },
    fields: () => {
      return {
        'name': 1,
        'companyId': 1,
        'contactId': 1,
        'value': 1,
        'estCloseDate': 1,
        'isArchived': 1,
        'hasBeenWon': 1,
        'reasonLost': 1,
        'tags': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.showArchived) {
        selector.isArchived = true;
      } else {
        selector.isArchived = { $ne: true };
      }
      return selector;
    }
  })
});

Tags.TagsMixin(Opportunities);

//////////////////////
// COLLECTION HOOKS //
//////////////////////
Opportunities.after.insert(function(userId, doc) {
  logEvent('info', 'A new opportunity has been created: ' + doc.name);
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
