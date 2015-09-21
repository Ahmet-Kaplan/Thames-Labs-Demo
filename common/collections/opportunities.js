Collections.opportunities = Opportunities = new Mongo.Collection('opportunities');

Partitioner.partitionCollection(Opportunities);

Opportunities.initEasySearch(['name', 'tags'], {
  limit: 50,
  props: {
    showArchived: false
  },
  query: function(searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    if (!this.props.showArchived) {
      query.isArchived = {
        $ne: true
      };
    }
    return query;
  }
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
