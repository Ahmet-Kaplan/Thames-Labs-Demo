import { Quotations } from '/imports/api/lookup/quotations.js';

Template.login.onCreated(function() {
  this.subscribe('allNotifications');
});

Template.login.helpers({
  quotationOfDay: function() {
    return Quotations.quotationOfDay();
  },
  notifications: function() {
    return Notifications.find({
      target: 'all'
    });
  },
  hasNotifications: function() {
    return Notifications.find({}).count() > 0;
  }
});
