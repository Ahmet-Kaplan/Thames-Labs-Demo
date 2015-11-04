AuditLog = new Mongo.Collection('audit');

Partitioner.partitionCollection(AuditLog);

////////////////////
// SEARCH INDICES //
////////////////////

AuditLogIndex = new EasySearch.Index({
  collection: AuditLog,
  fields: ['message'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return { 'date': -1 }
    }
  })
});
