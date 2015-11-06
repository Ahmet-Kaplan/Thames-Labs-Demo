Collections.globalAudit = GlobalAudit = new Mongo.Collection('globalAudit');

Collections.globalAudit.index = GlobalAuditIndex = new EasySearch.Index({
  collection: GlobalAudit,
  fields: ['message', 'level', 'user', 'tenant'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'date': -1
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      if (options.search.props.autosuggest) {
        return {
          'message': 1
        }
      }
      return {
        'date': 1,
        'level': 1,
        'source': 1,
        'message': 1,
        'user': 1,
        'tenant': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      return selector;
    }
  })
});
