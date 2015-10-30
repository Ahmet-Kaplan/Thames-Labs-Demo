// The tags package introduces Meteor.tags as a collection
Partitioner.partitionCollection(Meteor.tags);

////////////////////
// SEARCH INDICES //
////////////////////

TagsIndex = new EasySearch.Index({
  collection: Meteor.tags,
  fields: ['name'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'name': 1 }
    },
    fields: (searchObject, options) => {
      if (options.search.props.autosuggest) {
        return {
          'name': 1,
          'nRefs': 1
        }
      }
      return {};
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.collection) {
        selector.collection = options.search.props.collection;
      }
      return selector;
    }
  })
});
