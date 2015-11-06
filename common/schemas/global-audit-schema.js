Schemas.GlobalAudit = new SimpleSchema({
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
  tenant: {
    type: String,
    optional: true
  }
});
GlobalAudit.attachSchema(Schemas.GlobalAudit);
