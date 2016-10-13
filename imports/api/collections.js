import { Activities as ActivitiesCollection } from './activities/collection.js';
import { Companies as CompaniesCollection } from './companies/collection.js';
import { Contacts as ContactsCollection } from './contacts/collection.js';
import { CustomFields as CustomFieldsCollection } from './custom-fields/collection.js';
import { Notifications as NotificationsCollection } from './notifications/collection.js';
import { Jobs as JobCollection } from './jobs/collection.js';
import { Tags as TagCollection } from './tags/collection.js';
import { Tasks as TaskCollection } from './tasks/collection.js';
import { Tenants as TenantCollection } from './tenants/collection.js';
import { Users as UsersCollection } from './users/collection.js';

export const Activities = ActivitiesCollection;
export const Companies = CompaniesCollection;
export const Contacts = ContactsCollection;
export const CustomFields = CustomFieldsCollection;
export const Notifications = NotificationsCollection;
export const Jobs = JobCollection;
export const Tags = TagCollection;
export const Tasks = TaskCollection;
export const Tenants = TenantCollection;
export const Users = UsersCollection;

if (Meteor.isDevelopment) {
  SimpleSchema.debug = true;
}