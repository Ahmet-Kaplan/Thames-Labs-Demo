Template.notificationAdmin.helpers({
  notifications: function() {
    return g_Notifications.find({}, {sort: {createdAt: -1}});
  }
});

Template.notificationAdmin.events({
  "click #btnRaiseNotification": function(event, template) {
    var title = $('#txtNotificationTitle').val();
    var text = $('#txtNotification').val();
    g_Notifications.insert({
      title: title,
      detail: text,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    });
    $('#txtNotification').val("");
    $('#txtNotificationTitle').val("");
  }
});

Template.notification.events({
  "click #btnDeleteNotification": function(event, template) {
    g_Notifications.remove(this._id);
  }
});
