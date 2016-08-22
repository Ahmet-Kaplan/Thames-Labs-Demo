import './top-menu/top-menu.js';
import './side-menu/side-menu.js';
import './nav.html';

Session.setDefault('notifications', []);

Template.nav.onCreated(function() {

  this.showAllNotices = new ReactiveVar(false);

  this.subscribe('allNotifications');

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

  $('#show-less-notices').hide();
});

Template.nav.onRendered(function() {
  this.autorun(() => {
    const showAll = this.showAllNotices.get(),
          notices = Notifications.find({
            target: {
              $in: [Meteor.userId(), 'all']
            }
          }, {
            sort: {
              createdAt: -1
            },
            limit: (showAll === true ? 99 : NOTICE_LIMIT)
          }).fetch();

    Session.set('notifications', notices);
  });
});

Template.nav.helpers({
  displayShowLess: function() {
    const showAll = Template.instance().showAllNotices.get();
    return (showAll === true);
  },
  displayShowMore: function() {
    const showAll = Template.instance().showAllNotices.get();
    return (showAll === false);
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
    return Session.get('notifications');
  },
  recentNote: function() {
    const today = new Date(),
          yesterday = new Date(today),
          recent = Notifications.find({
            target: {
              $in: [Meteor.userId(), 'all']
            }
          }, {
            sort: {
              createdAt: -1
            },
            limit: 1
          }).fetch()[0];

    yesterday.setDate(today.getDate() - 1);

    if (recent) {
      return (recent.createdAt >= yesterday);
    }
  },
  recentNoteCount: function() {
    return Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }).count();
  },
  favourites: function() {
    const ux = Meteor.users.findOne(Meteor.userId());

    if (ux) {
      const profile = ux.profile;
      if (!profile.favourites) {
        return null;
      }
      return profile.favourites;
    }
  }
});

//NOTE: Repeated ID's for elements in the navbar and sidemenu are okay, as only one will be displayed at a time
Template.nav.events({
  'click #show-more-notices': function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    Template.instance().showAllNotices.set(true);

    $('#show-more-notices').hide();
    $('#show-less-notices').show();
  },
  'click #show-less-notices': function(event, template) {
    event.preventDefault();
    event.stopPropagation();

    Template.instance().showAllNotices.set(false);
    $('#show-more-notices').show();
    $('#show-less-notices').hide();
  },
  'click #clear-all': function() {
    Meteor.call('removeAllNotifications');
  },
  'click #help-menu': function() {
    lastTutorial = "help";
    Modal.show("help");
  },
  'click #tips': function(event, template) {
    event.preventDefault();
    Modal.show("tipsModal");
  },
  'click #toggle-search': function(event) {
    event.preventDefault();
    const state = Session.get('globalSearchOpen');
    if (state === false) {
      Session.set('globalSearchOpen', true);
      Modal.show('globalSearch');
    } else {
      Session.set('globalSearchOpen', false);
      Modal.hide('globalSearch');
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
  },
  'click .panel-body > table > tr > td > a': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '');
    }
  },
  'click .dismiss-on-click': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '');
    }
  }
});

Template.notice.helpers({
  shortText: function() {
    const c = this.title,
          s = c.substr(0, 40);
    if (s.length > 37) {
      return s + "...";
    }
    return s;
  },
  shortDetail: function() {
    const c = this.detail,
          s = c.substr(0, 40);
    if (s.length > 37) {
      return s + "...";
    }
    return s;
  },

  recentNote: function() {
    const today = new Date(),
          yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (this.createdAt >= yesterday);
  }
});

Template.notice.events({
  'click .btnOpenNotice': function(event) {
    event.preventDefault();
    Modal.show('notificationModal', this);
  }
});

Template.menuNotice.helpers({
  shortText: function() {
    const c = this.title,
          s = c.substr(0, 40);
    if (s.length > 37) {
      return s + "...";
    }
    return s;
  },
  recentNote: function() {
    const today = new Date(),
          yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (this.createdAt >= yesterday);
  }
});

Template.menuNotice.events({
  'click .btnOpenNotice': function(event) {
    event.preventDefault();
    Modal.show('notificationModal', this);
  }
});

Template.notificationModal.helpers({
  isPersonalNotification: function() {
    return this.target === Meteor.userId();
  }
});

Template.notificationModal.events({
  'click #removeNotification': function() {
    Meteor.call('removeNotification', this._id);
    Modal.hide();
  }
});
