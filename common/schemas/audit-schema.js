Schemas.Audit = new SimpleSchema({
  token: {
    type: String,
    unique: true
  },
  date: {
    type: Date
  },
  source: {
    type: String,
    defaultValue: 'client'
  },
  level: {
    type: String
  },
  message: {
    type: String
  },
  user: {
    type: String,
    optional: true
  },
  entityType: {
    type: String,
    optional: true
  },
  entityId: {
    type: String,
    optional: true
  }
});
AuditLog.attachSchema(Schemas.Audit);