Template.notificationAdmin.helpers({
  notifications: function() {
    return g_Notifications.find({});
  }
});

Template.notificationAdmin.events({
  "click #btnRaiseNotification": function(event, template) {
    var text = $('#txtNotification').val();
    g_Notifications.insert({
      detail: text,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    });
    $('#txtNotification').val("");
  }
});

Template.notification.events({
  "click #btnDeleteNotification": function(event, template) {
    g_Notifications.remove(this._id);
  }
});
