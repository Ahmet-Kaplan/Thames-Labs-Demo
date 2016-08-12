import './event-list-item.html';

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
