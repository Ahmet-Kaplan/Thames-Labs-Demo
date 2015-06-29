Template.notificationAdmin.helpers({
  notifications: function() {
    return Notifications.find({}, {sort: {createdAt: -1}});
  }
});

Template.notificationAdmin.events({
  "click #btnRaiseNotification": function(event, template) {
    var title = $('#txtNotificationTitle').val();
    var text = $('#txtNotification').val();
    Notifications.insert({
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
    Notifications.remove(this._id);
  }
});
