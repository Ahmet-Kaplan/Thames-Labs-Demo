import { Quotations } from '/imports/api/lookup/quotations.js';

Template.login.onCreated(function() {
  this.subscribe('allNotifications');
});

Template.login.helpers({
  quotationOfDay: function() {
    var date = new Date();
    date.setMonth(0, 0);
    var i = Math.round((new Date() - date) / 8.64e7) % Quotations.length;
    var quoteObject = Quotations[i];

    if (typeof quoteObject.Person === "undefined") {
      quoteObject.Person = "Anonymous";
    }
    return quoteObject;
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
