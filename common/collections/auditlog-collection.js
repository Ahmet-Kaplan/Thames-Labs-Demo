Collections.auditLog = AuditLog = new Mongo.Collection('audit');

Partitioner.partitionCollection(AuditLog);

////////////////////
// SEARCH INDICES //
////////////////////

Collections.auditLog.index = AuditLogIndex = new EasySearch.Index({
  collection: AuditLog,
  fields: ['message', 'level'],
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
        'message': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      return selector;
    }
  })
});
