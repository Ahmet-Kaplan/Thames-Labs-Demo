import { Activities, EventLog, Notifications, Opportunities, Projects, Products, PurchaseOrders, Tasks } from '/imports/api/collections.js';
import { Tags } from '/imports/api/tags/collection.js';
Collections = {};
Collections.helpers = {};

Collections.activities = Activities;
Collections.eventLog = EventLog;
Collections.notifications = Notifications;
Collections.opportunities = Opportunities;
Collections.projects = Projects;
Collections.products = Products;
Collections.purchaseorders = PurchaseOrders;
Collections.tags = Tags;
Collections.tasks = Tasks;