import { EventLog, Notifications, Products } from '/imports/api/collections.js';
import { Tags } from '/imports/api/tags/collection.js';
Collections = {};
Collections.helpers = {};

Collections.eventLog = EventLog;
Collections.notifications = Notifications;
Collections.products = Products;
Collections.tags = Tags;