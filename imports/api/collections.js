import { EventLog as EventLogCollection } from './event-log/collection.js';
import { Notifications as NotificationsCollection } from './notifications/collection.js';
import { Opportunities as OpportunitiesCollection } from './opportunities/collection.js';
import { Products as ProductCollection } from './products/collection.js';
import { Projects as ProjectCollection } from './projects/collection.js';
import { PurchaseOrders as PurchaseOrderCollection } from './purchase-orders/collection.js';
import { PurchaseOrderItems as PurchaseOrderItemCollection } from './purchase-orders/items/collection.js';
import { Tasks as TaskCollection } from './tasks/collection.js';

export const EventLog = EventLogCollection;
export const Notifications = NotificationsCollection;
export const Opportunities = OpportunitiesCollection;
export const Products = ProductCollection;
export const Projects = ProjectCollection;
export const PurchaseOrders = PurchaseOrderCollection;
export const PurchaseOrderItems = PurchaseOrderItemCollection;
export const Tasks = TaskCollection;