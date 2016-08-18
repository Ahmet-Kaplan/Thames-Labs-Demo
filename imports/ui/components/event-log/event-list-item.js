import './event-list-item.html';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import bootbox from 'bootbox';
Template.events.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Event Log view');
      FlowRouter.go('/');
    }

    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadEventLog');
  });
});

Template.events.events({
  'click #clear-log': function(event) {
    event.preventDefault();
    bootbox.confirm('Are you sure you wish to clear all the event log?', function(result) {
      if(result === true) {
        Meteor.call('clearEventLog', function(err, res) {
          if(err) {
            toastr.error('Unable to clear event log');
            return false;
          }
          toastr.success('Event log cleared!');
          return true;
        });
      }
    });
  },
});

Template.eventEntry.helpers({

  isLinkable: function() {
    if (this.entityType === "user" || this.entityType === "tenant") return false;
    return true;
  },

  userName: function() {
    if (typeof this.user !== "undefined") {
      const u = Meteor.users.findOne(this.user);
      if (u) {
        return u.profile.name;
      }
    }
  },

  displayLevel: function() {
    let returnedData;

    switch (this.level) {
      case 'fatal':
        returnedData = "<div id='logLevel'><span class='label label-primary'>fatal</span></div>";
        break;
      case 'error':
        returnedData = "<div id='logLevel'><span class='label label-danger'>error</span></div>";
        break;
      case 'warning':
        returnedData = "<div id='logLevel'><span class='label label-warning'>warning</span></div>";
        break;
      case 'info':
        returnedData = "<div id='logLevel'><span class='label label-info'>info</span></div>";
        break;
      case 'verbose':
        returnedData = "<div id='logLevel'><span class='label label-success'>verbose</span></div>";
        break;
      case 'debug':
        returnedData = "<div id='logLevel'><span class='label label-default'>debug</span></div>";
        break;
    }

    return returnedData;
  },
  entityIcon: function() {
    let icon;
    switch (this.entityType) {
      case 'company':
        icon = "building";
        break;
      case 'contact':
        icon = "user";
        break;
      case 'opportunity':
        icon = "lightbulb-o";
        break;
      case 'project':
        icon = "sitemap";
        break;
      case 'purchaseOrder':
        icon = "shopping-cart";
        break;
      case 'task':
        icon = "check";
        break;
    }
    return icon;
  }
});
