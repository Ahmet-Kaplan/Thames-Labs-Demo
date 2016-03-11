Template.notificationAdmin.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.notificationAdmin.helpers({
  notifications: function() {
    return Notifications.find({
      target: 'all'
    }, {
      sort: {createdAt: -1}
    });
  },
  features: function() {
    return Features.find({});

  }
});

Template.notificationAdmin.events({
  "click #btnRaiseNotification": function(event, template) {
    var title = $('#txtNotificationTitle').val();
    var desc = $('#txtDesc').val();
    var details = $('#txtDetails').val();
    var icon = $('#txtIcon').val();
    Notifications.insert({
      title: title,
      shortDescription: desc,
      detail: details,
      icon: icon,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    });
    
    $('#txtNotificationTitle').val("");
    $('#txtDesc').val("");
    $('#txtDetails').val("");
    $('#txtIcon').val("");
  }
});

Template.notification.events({
  "click #btnDeleteNotification": function(event, template) {
    Notifications.remove(this._id);
  }
});
