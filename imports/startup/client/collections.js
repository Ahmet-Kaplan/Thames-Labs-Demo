//Adds collections to window scope (needed for autoform, see https://github.com/aldeed/meteor-autoform/issues/1449)
import { Activities, Companies, Contacts, EventLog, Notifications, Opportunities, Projects, Products, PurchaseOrders, Tasks, Tenants, Users } from '/imports/api/collections.js';
import { Tags } from '/imports/api/tags/collection.js';

window.Activities = Activities;
window.Companies = Companies;
window.Contacts = Contacts;
window.EventLog = EventLog;
window.Notifications = Notifications;
window.Opportunities = Opportunities;
window.Projects = Projects;
window.Products = Products;
window.Purchaseorders = PurchaseOrders;
window.Tags = Tags;
window.Tasks = Tasks;
window.Tenants = Tenants;
window.Users = Users;