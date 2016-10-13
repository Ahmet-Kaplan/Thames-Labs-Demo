import { Notifications } from '/imports/api/collections.js';

Meteor.methods({
  setNotified: function(notificationId) {
    const notification = Notifications.findOne(notificationId);
    if (notification.target !== this.userId) {
      throw new Meteor.Error(403, "You do not have the permission to alter this data.");
    }

    Notifications.update(notificationId, {
      $set: {
        notified: true
      }
    });
  },

  removeNotification: function(notificationId) {
    const notification = Notifications.findOne(notificationId);
    if (notification.target !== this.userId) {
      throw new Meteor.Error(403, "You do not have the permission to alter this data.");
    }

    Notifications.remove(notificationId);
  },

  removeAllNotifications: function() {
    Notifications.remove({
      target: this.userId
    });
  }
});