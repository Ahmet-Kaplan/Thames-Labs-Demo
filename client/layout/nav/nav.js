Template.nav.helpers({
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
    return Notifications.find({}, {
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

    var recent = Notifications.find({}, {
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

    return Notifications.find({}, {
      sort: {
        createdAt: -1
      }
    }).count();
  },
  favourites: function() {
    var profile = Meteor.users.findOne(Meteor.userId()).profile;
    if (!profile.favourites) {
      return null;
    } else {
      favList = profile.favourites;
      return favList;
      // var list = new ReactiveArray();
      // _.each(favList, function(f) {
      //   list.push(f);
      // });
      // console.log(list);
      // return list;
    }
  },
  shouldDisplayMenu: function() {
    var isUserAdmin = Roles.userIsInRole(Meteor.user(), ['superadmin']);
    if (isUserAdmin) {
      return "visible-xs";
    } else {
      return "";
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

//NOTE: Repeated ID's for elements in the navbar and sidemenu are okay, as only one will be displayed at a time
Template.nav.events({
  'click #mnuAddToFavourites': function() {
    var profile = Meteor.users.findOne(Meteor.userId()).profile;

    if (profile.favourites) {
      var favList = profile.favourites;
      var exists = false;

      _.each(favList, function(y) {
        if (y.url === Router.current().url) {
          exists = true;
        }
      });

      if (exists) {
        toastr.info('Page already favourited.');
        return;
      }
      else {
        var x = {
          name: document.title,
          url: Router.current().url
        }
        favList.push(x);
        profile.favourites = favList;
      }
    } else {
      var fav = [];
      var x = {
        name: document.title,
        url: Router.current().url
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
  'click #qckCreateCompany': function() {
    Modal.show('insertNewCompanyModal', this);
  },
  'click #qckCreateContact': function() {
    Modal.show('insertCompanyContactModal', this);
  },
  'click #qckCreateProject': function() {
    Modal.show('newProjectForm', this);
  },
  'click #qckCreatePurchaseOrder': function() {
    Modal.show('newPurchaseOrderForm', this);
  },
  'click #feedback-link': function() {
    Modal.show('feedbackModal');
  },
  'click #btnChangePassword': function() {
    Modal.show('changePassword');
  },
  'click #sign-out': function() {
    Meteor.logout();
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

Template.notice.events({
  'click .btnOpenNotice': function() {
    Modal.show('notificationModal', this);
  }
});

Template.menuNotice.events({
  'click .btnOpenNotice': function() {
    Modal.show('notificationModal', this);
  }
});
