import { Activities as ActivitiesCollection } from './activities/collection.js';
import { Companies as CompaniesCollection } from './companies/collection.js';
import { Contacts as ContactsCollection } from './contacts/collection.js';
import { CustomFields as CustomFieldsCollection } from './custom-fields/collection.js';
import { EventLog as EventLogCollection } from './event-log/collection.js';
import { Notifications as NotificationsCollection } from './notifications/collection.js';
import { Opportunities as OpportunitiesCollection } from './opportunities/collection.js';
import { Products as ProductCollection } from './products/collection.js';
import { Projects as ProjectCollection } from './projects/collection.js';
import { PurchaseOrders as PurchaseOrderCollection } from './purchase-orders/collection.js';
import { PurchaseOrderItems as PurchaseOrderItemCollection } from './purchase-orders/items/collection.js';
import { Tags as TagCollection } from './tags/collection.js';
import { Tasks as TaskCollection } from './tasks/collection.js';
import { Tenants as TenantCollection } from './tenants/collection.js';
import { Users as UsersCollection } from './users/collection.js';

export const Activities = ActivitiesCollection;
export const Companies = CompaniesCollection;
export const Contacts = ContactsCollection;
export const CustomFields = CustomFieldsCollection;
export const EventLog = EventLogCollection;
export const Notifications = NotificationsCollection;
export const Opportunities = OpportunitiesCollection;
export const Products = ProductCollection;
export const Projects = ProjectCollection;
export const PurchaseOrders = PurchaseOrderCollection;
export const PurchaseOrderItems = PurchaseOrderItemCollection;
export const Tags = TagCollection;
export const Tasks = TaskCollection;
export const Tenants = TenantCollection;
export const Users = UsersCollection;

if (Meteor.isDevelopment) {
  SimpleSchema.debug = true;
}