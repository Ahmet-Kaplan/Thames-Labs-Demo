Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 150,
    vertical_margin: 10,
    animate: true
  })

  $('.chatWindow').scrollTop($('.chatWindow').prop("scrollHeight"));
});

Template.message.onRendered(function() {
  $('.chatWindow').scrollTop($('.chatWindow').prop("scrollHeight"));
});

Template.dashboard.events({
  'change .grid-stack': function(e, items) {
      var elts = $('.grid-stack > .grid-stack-item:visible');
      _.each(elts, function(elt) {
        var id = elt.id;
        elt = $(elt);
        attributes = {
          id: id,
          x: elt.attr('data-gs-x'),
          y: elt.attr('data-gs-y'),
          height: elt.attr('data-gs-height'),
          width: elt.attr('data-gs-width')
        }
        console.log(attributes);
      });
      // var attributes = item.el.data();
  },
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

Template.dashboard.helpers({
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

        var data = "<small><i class='fa fa-fw fa-circle text-danger'></i>" + u.profile.name + " (<em>" + loginStatus + "</em>)</small>";
        offlineUsers.push(data);
      };
    });

    return offlineUsers.array().join(', ');
  },

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
  getCurrentUserId: function() {
    return Meteor.userId();
  }
});

Template.colleagueData.events({

});

Template.colleagueData.helpers({
  isOnline: function() {
    return (this.state === "online" ? true : false);
  }
});

Template.message.helpers({
  niceTime: function() {
    return moment(this.createdAt).fromNow();
  }
});
