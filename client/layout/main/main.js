import { Tenants } from '/imports/api/collections.js';
import '/imports/ui/components/loading/loading.js';
import '/imports/ui/components/login/login.js';
import '/imports/ui/components/maintenance/maintenance.js';

Template.appLayout.onCreated(function() {
});

Template.appLayout.onRendered(function() {
  this.autorun(function() {
    Meteor.user();
  });
  this.autorun(function() {
    const visitor = Meteor.user();
    const tenant = !!visitor ? Tenants.findOne({
      _id: visitor.group
    }) : null;
  });

  $.getScript('/vendor/bowser.min.js');
  if (bowser.mobile || Meteor.isCordova) {
    $("#id-view-content").swipe({
      swipeLeft: function(event) {
        document.getElementById("id-view-sidemenu").className = "";
      },
      swipeRight: function(event) {
        document.getElementById("id-view-sidemenu").className = "active";
      },
      threshold: 75
    });
  }
});

Template.appLayout.helpers({
  hasMenuClass: function() {
    if (!Meteor.userId()) {
      return 'no-menu';
    }
  },
  maintenanceMode: function() {
    return ServerSession.get('maintenance') && !Roles.userIsInRole(Meteor.userId(), ['superadmin']);
  },
  subsReady: function() {
    return FlowRouter.subsReady();
  }
});
