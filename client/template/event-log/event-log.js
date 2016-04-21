Template.events.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Event Log view');
      FlowRouter.go('/');
    }

    redirectWithoutPermission(Meteor.userId(), 'CanReadEventLog');
  });
});

Template.eventEntry.helpers({
  friendlyDate: function() {
    return new moment(this.date).format("Do MMMM YYYY, HH:mm:ss");
  },
  userName: function() {
    if (this.user !== undefined) {

      var u = Meteor.users.findOne(this.user);
      if (u) {
        return u.profile.name;
      }
    }
  },
  displayLevel: function() {
    var returnedData;

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
    var icon = "building";
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