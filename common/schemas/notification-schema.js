import { Notifications } from '/common/collections/notifications-collection.js';

Schemas.Notification = new SimpleSchema({
  title: {
    type: String
  },
  shortDescription: {
    type: String
  },
  detail: {
    type: String
  },
  target: {
    type: String,
    defaultValue: 'all'
  },
  notified: {
    type: Boolean,
    defaultValue: false
  },
  createdAt: {
    type: Date
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  icon: {
    type: String,
    optional: true
  }
});
Notifications.attachSchema(Schemas.Notification);
