Template.dashboard.helpers({
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
  }
});

Template.colleagueData.events({
  'click .activeUserLink': function(){
    // Router.go(this.url);
  }
});
