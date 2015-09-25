Template.login.onCreated(function() {
  this.subscribe('allNotifications');
});

Template.login.helpers({
  quotationOfDay: function() {
    var date = new Date();
    date.setMonth(0, 0);
    var i = Math.round((new Date() - date) / 8.64e7) % quotations.length;
    var quoteObject = quotations[i];

    if (quoteObject.Person === undefined) {
      quoteObject.Person = "Anonymous"
    }
    return quoteObject;
  },
  notifications: function() {
    return Notifications.find({});
  },
  hasNotifications: function() {
    return Notifications.find({}).count() > 0;
  }
});
