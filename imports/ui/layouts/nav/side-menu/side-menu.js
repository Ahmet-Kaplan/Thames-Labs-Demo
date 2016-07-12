import './menu-button/menu-button.js';
import './favourites/favourites.js';
import './side-menu.html';

Template.sideMenu.helpers({
  displayShowLess: function() {
    var showAll = Session.get('showAllNotices');
    return (showAll === true);
  },
  displayShowMore: function() {
    var showAll = Session.get('showAllNotices');
    return (showAll === false);
  },
  notificationLimit: function() {
    return NOTICE_LIMIT;
  },
  showTourOption: function() {
    var currRoute = FlowRouter.getRouteName();
    var show = false;

    _.each(availableTours, function(at) {
      if (at === currRoute) {
        show = true;
      }
    });

    return show;
  },
  loggedIn: function() {
    return !!Meteor.userId();
  },
  userName: function() {
    if (!Meteor.userId()) {
      return false;
    }

    var sName = '';
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      var user = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch()[0];

      if (user) {
        sName = user.profile.name;
      }
    }

    return sName;
  },
  notifications: function() {
    return Session.get('notifications');
  },
  recentNote: function() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    var recent = Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }, {
      sort: {
        createdAt: -1
      },
      limit: 1
    }).fetch()[0];

    if (recent) {
      return (recent.createdAt >= yesterday);
    }
  },
  recentNoteCount: function() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }).count();
  }
});
