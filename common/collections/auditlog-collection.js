Collections.auditLog = AuditLog = new Mongo.Collection('audit');
Partitioner.partitionCollection(AuditLog);
