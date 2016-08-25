import { EventLog, Notifications, Opportunities, Products, PurchaseOrders } from '/imports/api/collections.js';
import { Tags } from '/imports/api/tags/collection.js';
Collections = {};
Collections.helpers = {};

Collections.eventLog = EventLog;
Collections.notifications = Notifications;
Collections.opportunities = Opportunities;
Collections.products = Products;
Collections.purchaseorders = PurchaseOrders;
Collections.tags = Tags;