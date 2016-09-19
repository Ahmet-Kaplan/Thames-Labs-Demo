import { NotificationSchema } from './schema.js';

export const Notifications = new Mongo.Collection('notifications');
Notifications.attachSchema(NotificationSchema);
Notifications.permit(['insert', 'update', 'remove']).ifHasRole('superadmin').apply();