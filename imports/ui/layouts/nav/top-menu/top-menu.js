import '/imports/ui/components/tutorial-modal/tutorial-modal.js';

import './top-menu.less';
import './top-menu.html';
import '/imports/ui/components/feedback/feedback.js';

Template.topMenu.events({
  'click #tutorials': function(e) {
    e.preventDefault;
    Modal.show("tutorialModal");
  }
});

Template.topMenu.helpers({
  displayShowLess: function() {
    const showAll = Session.get('showAllNotices');
    return (showAll === true);
  },
  displayShowMore: function() {
    const showAll = Session.get('showAllNotices');
    return (showAll === false);
  },
  notificationLimit: function() {
    return NOTICE_LIMIT;
  },
  showTourOption: function() {
    const currRoute = FlowRouter.getRouteName();
    let show = false;

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

    let sName = '';
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      const user = Meteor.users.find({
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
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const recent = Notifications.find({
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
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }).count();
  },
  fabEnabled: function() {
    return Template.instance().fab.get();
  },
  fabOpen: function() {
    return Template.instance().fabOpen.get();
  },
  tenantName: function() {
    if (!Meteor.user()) return;

    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return !!tenant ? tenant.name : null;
  }
});

Template.topMenu.events({
  'click .direct-upgrade': function(evt) {
    evt.preventDefault();
    Modal.show('stripeSubscribe');
  }
});
