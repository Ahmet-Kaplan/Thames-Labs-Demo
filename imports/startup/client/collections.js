//Adds collections to window scope (needed for autoform, see https://github.com/aldeed/meteor-autoform/issues/1449)
import { Activities, Companies, Contacts, EventLog, Notifications, Opportunities, Projects, Products, PurchaseOrders, Tags, Tasks, Tenants, Users } from '/imports/api/collections.js';

window.Activities = Activities;
window.Companies = Companies;
window.Contacts = Contacts;
window.EventLog = EventLog;
window.Notifications = Notifications;
window.Opportunities = Opportunities;
window.Projects = Projects;
window.Products = Products;
window.PurchaseOrders = PurchaseOrders;
window.Tags = Tags;
window.Tasks = Tasks;
window.Tenants = Tenants;
window.Users = Users;