//Adds collections to window scope (needed for autoform, see https://github.com/aldeed/meteor-autoform/issues/1449)
import { Activities, Companies, Contacts, Notifications, Jobs, Tags, Tasks, Tenants, Users } from '/imports/api/collections.js';

window.Activities = Activities;
window.Companies = Companies;
window.Contacts = Contacts;
window.Notifications = Notifications;
window.Jobs = Jobs;
window.Tags = Tags;
window.Tasks = Tasks;
window.Tenants = Tenants;
window.Users = Users;