import './online.html';
Template.onlineWidget.onCreated(function() {
  this.subscribe('userPresence');
});

Template.onlineWidget.helpers({
  onlineColleagues: function() {
    var users = Meteor.users.find({
      "group": Partitioner.group()
    }).fetch();
    var onlineUsers = new ReactiveArray();

    _.each(users, function(u) {
      var online = Presences.find({
        userId: u._id
      }).fetch()[0];

      if (online) {
        var data = {
          user: u.profile.name,
          state: online.state,
          last: u.profile.lastActivity.page,
          url: u.profile.lastActivity.url
        };
        onlineUsers.push(data);
      }
    });

    return onlineUsers.array();
  },
  offlineColleagues: function() {
    var users = Meteor.users.find({
      "group": Partitioner.group()
    }).fetch();
    var offlineUsers = new ReactiveArray();

    _.each(users, function(u) {
      var online = Presences.find({
        userId: u._id
      }).fetch()[0];

      if (!online) {
        var loginStatus;
        if (u.profile.lastLogin === null) {
          loginStatus = "Never logged in.";
        } else {
          loginStatus = "Last seen " + moment(u.profile.lastLogin).fromNow();
        }

        var data = {
          user: u.profile.name,
          state: 'offline',
          loginStatus: loginStatus
        };
        offlineUsers.push(data);
      }
    });

    return offlineUsers.array();
  }
});

Template.colleagueData.helpers({
  isOnline: function() {
    return (this.state === "online");
  }
});
