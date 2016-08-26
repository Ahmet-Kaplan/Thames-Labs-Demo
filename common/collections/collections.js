import { Activities, Companies, Contacts, EventLog, Notifications, Opportunities, Projects, Products, PurchaseOrders, Tasks, Tenants, Users } from '/imports/api/collections.js';
import { Tags } from '/imports/api/tags/collection.js';
Collections = {};
Collections.helpers = {};

Collections.activities = Activities;
Collections.companies = Companies;
Collections.contacts = Contacts;
Collections.eventLog = EventLog;
Collections.notifications = Notifications;
Collections.opportunities = Opportunities;
Collections.projects = Projects;
Collections.products = Products;
Collections.purchaseorders = PurchaseOrders;
Collections.tags = Tags;
Collections.tasks = Tasks;
Collections.tenants = Tenants;
Collections.users = Users;

export { Collections };