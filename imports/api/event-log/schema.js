import { SimpleSchema } from 'meteor/aldeed:simple-schema';
export const EventLogSchema = new SimpleSchema({
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
    optional: true,
    allowedValues: ['company', 'contact', 'opportunity', 'project', 'purchaseOrder', 'task', 'user', 'product', 'tenant']
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