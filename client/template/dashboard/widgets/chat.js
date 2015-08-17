Template.chatWidget.onRendered(function() {
  $('.chatWindow').scrollTop($('.chatWindow').prop("scrollHeight"));
});

Template.chatWidget.events({
  'click .sendMessage': function() {
    var user = Meteor.users.find({
      _id: Meteor.userId()
    }).fetch()[0];

    if (user) {
      if (user.profile) {
        var m = $('.chatMessage').val();
        if (!m) return;
        Chatterbox.insert({
          user: user.profile.name,
          message: m,
          createdAt: new Date()
        });

        $('.chatWindow').scrollTop($('.chatWindow').prop("scrollHeight"));
        $('.chatMessage').val("");
      }
    }
  }
});

Template.chatWidget.helpers({
  chatMessages: function() {
    var user = Meteor.users.find({
      _id: Meteor.userId()
    }).fetch()[0];

    if (user) {
      if (user.profile) {
        var arr = [];
        var filter = new Date(user.profile.lastLogin);
        var msgs = Chatterbox.find({}).fetch();
        _.each(msgs, function(x) {
          var thisDate = new Date(x.createdAt);
          if (thisDate >= filter) {
            arr.push(x);
          }
        });
        return arr;
      }
    }
  },

  getCurrentUserId: function() {
    return Meteor.userId();
  }
});

Template.message.onRendered(function() {
  $('.chatWindow').scrollTop($('.chatWindow').prop("scrollHeight"));
});

Template.message.helpers({
  niceTime: function() {
    return moment(this.createdAt).fromNow();
  }
});
