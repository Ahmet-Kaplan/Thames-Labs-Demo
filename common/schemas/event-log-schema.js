Schemas.EventLog = new SimpleSchema({
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
  },
  tenant: {
    type: String,
    optional: true
  },
  group: {
    type: String,
    optional: true
  }
});
EventLog.attachSchema(Schemas.EventLog);