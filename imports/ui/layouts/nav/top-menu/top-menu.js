import '/imports/ui/components/tutorial-modals/help/help-menu.js';
import { Notifications, Tenants } from '/imports/api/collections.js';

import './top-menu.less';
import './top-menu.html';
import '/imports/ui/components/search/global/global-search.js';
import '/imports/ui/components/feedback/feedback.js';
import '/imports/ui/components/notifications/notice.js';
import '/imports/ui/components/notifications/modal.js';

Template.topMenu.onCreated(function() {

  this.subscribe('allNotifications');
  this.showAllNotices = new ReactiveVar(false);
  this.notifications = new ReactiveVar();
  this.autorun(() => {

    const getNotification = Notifications.findOne({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }, {
      sort: {
        createdAt: -1
      }
    });

    if (getNotification && !getNotification.notified && getNotification.target === Meteor.userId()) {
      if ("Notification" in window) {

        const options = {
          body: getNotification.shortDescription + ": " + getNotification.detail,
          icon: '/dark-icon.svg'
        };

        if (Notification.permission === "granted") {
          new Notification(getNotification.title, options);

        } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
            if (permission === "granted") {
              new Notification(getNotification.title, options);
            }
          });
        }

      }
      Meteor.call('setNotified', getNotification._id);
    }
  });
});


Template.topMenu.onRendered(function() {
  this.autorun(function() {
    const showAll = Template.instance().showAllNotices.get();

    const notices = Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }, {
      sort: {
        createdAt: -1
      },
      limit: (showAll === true ? 99 : NOTICE_LIMIT)
    }).fetch();

    Template.instance().notifications.set(notices);
  });
});

Template.topMenu.helpers({
  displayShowMore: function() {
    return !Template.instance().showAllNotices.get();
  },
  notificationLimit: function() {
    return NOTICE_LIMIT;
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
    return Template.instance().notifications.get();
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
  },
  'click #help-menu': function() {
    lastTutorial = "help";
    Modal.show("help");
  },
  'click #show-more-notices': function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    template.showAllNotices.set(true);
  },
  'click #show-less-notices': function(event, template) {
    event.preventDefault();
    event.stopPropagation();
    template.showAllNotices.set(false);
  },
  'click #clear-all': function() {
    Meteor.call('removeAllNotifications');
  },
  'click #toggle-search': function(event) {
    event.preventDefault();
    if ($("#globalSearchBox").length) {
      Modal.hide('globalSearch');
    } else {
      Modal.show('globalSearch');
    }
  },
  'click #feedback-link': function(event) {
    event.preventDefault();
    Modal.show('feedbackModal');
  },
  'click #sign-out': function() {
    Meteor.logout(function(err) {
      FlowRouter.reload();
    });
  },
  'click #id-menu-button': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '');
    } else {
      document.getElementById("id-view-sidemenu").className = "active";
    }
  }
});
