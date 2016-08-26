// The tags package introduces Meteor.tags as a collection
export const Tags = Meteor.tags;
Partitioner.partitionCollection(Meteor.tags);

Tags.index = new EasySearch.Index({
  collection: Meteor.tags,
  fields: ['name'],
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'name': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.autosuggest) {
        return {
          'name': 1,
          'nRefs': 1
        };
      }
      return {};
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.collection) {
        selector.collection = options.search.props.collection;
      }
      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }
      return selector;
    }
  })
});
