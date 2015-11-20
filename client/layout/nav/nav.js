Template.nav.onCreated(function() {
  this.subscribe('allNotifications');

  this.autorun(function() {
    var getNotification = Notifications.findOne({
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

        var options = {
          body: getNotification.shortDescription + ": " + getNotification.detail,
          icon: '/dark-icon.svg'
        }

        if (Notification.permission === "granted") {
          new Notification(getNotification.title, options);

        } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
            if (permission === "granted") {
              new Notification(getNotification.title, options);
            }
          })
        }

      }
      Meteor.call('setNotified', getNotification._id);
    }
  });
});

Template.nav.helpers({
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
    return (Meteor.userId() ? true : false);
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
    return Notifications.find({
      target: {
        $in: [Meteor.userId(), 'all']
      }
    }, {
      sort: {
        createdAt: -1
      },
      limit: 3
    });
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
      if (recent.createdAt >= yesterday) {
        return true;
      } else {
        return false;
      }
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
  },
  favourites: function() {
    var ux = Meteor.users.findOne(Meteor.userId());

    if (ux) {
      var profile = ux.profile;
      if (!profile.favourites) {
        return null;
      } else {
        favList = profile.favourites;
        return favList;
      }
    }
  },
  limitReached: function() {
    if (!Tenants.findOne({}) || Tenants.findOne({}).stripe.paying || Tenants.findOne({}).stripe.freeUnlimited) {
      return false;
    }
    var totalRecords = Tenants.findOne({}).stripe.totalRecords;
    return totalRecords >= MAX_RECORDS;
  }
});

//NOTE: Repeated ID's for elements in the navbar and sidemenu are okay, as only one will be displayed at a time
Template.nav.events({
  'click #start-welcome-tour': function() {
    FlowRouter.go('dashboard');
		hopscotch.endTour(true);
    Session.set('hopscotch.welcomeTourStep');
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  'click #start-company-tutorial': function() {
    FlowRouter.go('dashboard');
		hopscotch.endTour(true);
    Session.set('hopscotch.companyTutorialStep');
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  'click #tour-this-page': function() {
    var currentPageName = FlowRouter.getRouteName();

    $.getScript('/vendor/hopscotch/tours/' + currentPageName + '_tour.js');
  },
  'click #mnuAddToFavourites': function() {
    var profile = Meteor.users.findOne(Meteor.userId()).profile;

    if (profile.favourites) {
      var favList = profile.favourites;
      var exists = false;

      _.each(favList, function(y) {
        if (y.url === FlowRouter.current().path) {
          exists = true;
        }
      });

      if (exists) {
        toastr.info('Page already favourited.');
        return;
      } else {
        var x = {
          name: document.title,
          url: FlowRouter.current().path
        }
        favList.push(x);
        profile.favourites = favList;
      }
    } else {
      var fav = [];
      var x = {
        name: document.title,
        url: FlowRouter.current().path
      }
      fav.push(x);
      profile.favourites = fav;
    }

    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: profile
      }
    });
  },
  'click #toggle-search': function(event) {
    event.preventDefault();
    var state = Session.get('globalSearchOpen');
    if (state === false) {
      Session.set('globalSearchOpen', true);
      Modal.show('globalSearch');
    } else {
      Session.set('globalSearchOpen', false);
      Modal.hide('globalSearch');
    }
  },
  'click #qckCreateCompany': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateCompanies'])) {
      toastr.warning('You do not have permission to create companies. Please contact your system administrator.');
      return;
    }

    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  },
  'click #qckCreateContact': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateContacts'])) {
      toastr.warning('You do not have permission to create contacts. Please contact your system administrator.');
      return;
    }

    event.preventDefault();
    Modal.show('insertContactModal', this);
  },
  'click #qckCreateProject': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateProjects'])) {
      toastr.warning('You do not have permission to create projects. Please contact your system administrator.');
      return;
    }

    event.preventDefault();
    Modal.show('newProjectForm', this);
  },
  'click #qckCreatePurchaseOrder': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreatePurchaseOrders'])) {
      toastr.warning('You do not have permission to create purchase orders. Please contact your system administrator.');
      return;
    }

    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
  },
  'click #feedback-link': function(event) {
    event.preventDefault();
    Modal.show('feedbackModal');
  },
  'click #btnChangePassword': function(event) {
    event.preventDefault();
    Modal.show('changePassword');
  },
  'click #sign-out': function() {
    Meteor.logout(function(err) {
      FlowRouter.reload();
    });
  },
  'click #id-menu-button': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '')
    } else {
      document.getElementById("id-view-sidemenu").className = "active";
    }
  },
  'click .panel-body > table > tr > td > a': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '')
    }
  },
  'click .dismiss-on-click': function() {
    if (document.getElementById("id-view-sidemenu").className.match(/(?:^|\s)active(?!\S)/)) {
      document.getElementById("id-view-sidemenu").className =
        document.getElementById("id-view-sidemenu").className.replace(/(?:^|\s)active(?!\S)/g, '')
    }
  }
});

Template.notice.helpers({
  shortText: function() {
    var c = this.title;
    var s = c.substr(0, 40);
    if (s.length > 37) {
      return s + "...";
    } else {
      return s;
    }
  },
  recentNote: function() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (this.createdAt >= yesterday) {
      return true;
    } else {
      return false;
    }
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
    var c = this.title;
    var s = c.substr(0, 40);
    if (s.length > 37) {
      return s + "...";
    } else {
      return s;
    }
  },
  recentNote: function() {
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (this.createdAt >= yesterday) {
      return true;
    } else {
      return false;
    }
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
})
