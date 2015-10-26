AuditLog = new Mongo.Collection('audit');

Partitioner.partitionCollection(AuditLog);

////////////////////
// SEARCH INDICES //
////////////////////

AuditLog.initEasySearch(['message'], {
  limit: 20,
  use: 'mongo-db',
  sort: function() {
    return {
      'date': -1
    };
  }
});
