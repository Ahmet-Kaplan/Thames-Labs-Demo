import { Activities, Companies, Contacts, Notifications, Jobs, Tags, Tasks, Tenants, Users } from '/imports/api/collections.js';
Collections = {};
Collections.helpers = {};

Collections.activities = Activities;
Collections.companies = Companies;
Collections.contacts = Contacts;
Collections.notifications = Notifications;
Collections.jobs = Jobs;
Collections.tags = Tags;
Collections.tasks = Tasks;
Collections.tenants = Tenants;
Collections.users = Users;

export { Collections };