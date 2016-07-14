import '/imports/startup/client';
import { loadTawkTo, updateTawkToVisitor } from '/imports/ui/components/tawk-to/tawk-to.js';

Template.appLayout.onCreated(function() {
  loadTawkTo();
});

Template.appLayout.onRendered(function() {
  this.autorun(function() {
    const visitor = Meteor.user();
    const tenant = !!visitor ? Tenants.findOne({
      _id: visitor.group
    }) : null;
    updateTawkToVisitor(visitor, tenant);
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