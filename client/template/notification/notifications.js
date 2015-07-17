Template.notificationAdmin.helpers({
  notifications: function() {
    return Notifications.find({}, {sort: {createdAt: -1}});
  },
  features: function() {
    return Features.find({});

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
  },

  "click #btnAddFeature": function(event, template) {
      var desc = $('#txtFeatureDesc').val();
      var icon = $('#txtFeatureIcon').val();
      Features.insert({
        description: desc,
        icon: icon
      });
   }
});

Template.notification.events({
  "click #btnDeleteNotification": function(event, template) {
    Notifications.remove(this._id);
  }
});

Template.feature.events({
  "click #btnDeleteFeature": function(event, template) {
    Features.remove(this._id);
  }
});
