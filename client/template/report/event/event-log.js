Template.events.helpers({
  events: function() {
    return AuditLog.find({});
  }
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
        returnedData = "<div><span class='label label-primary'>FATAL</span></div>";
        break;
      case 'error':
        returnedData = "<div><span class='label label-danger'>ERROR</span></div>";
        break;
      case 'warning':
        returnedData = "<div><span class='label label-warning'>WARNING</span></div>";
        break;
      case 'info':
        returnedData = "<div><span class='label label-info'>INFO</span></div>";
        break;
      case 'verbose':
        returnedData = "<div><span class='label label-success'>VERBOSE</span></div>";
        break;
      case 'debug':
        returnedData = "<div><span class='label label-default'>DEBUG</span></div>";
        break;
    }

    return returnedData;
  },
  entityName: function() {
    var returnedData;
    var entity;
    switch (this.entityType) {
      case 'Company':
        entity = Companies.findOne(this.entityId);
        returnedData = "<div><i class='fa fa-fw fa-building'></i>" + entity.name + "</div>";
        break;
      case 'Contact':
        entity = Contacts.findOne(this.entityId);
        returnedData = "<div><i class='fa fa-fw fa-user'></i>" + entity.title + " " + entity.forename + " " + entity.surname + "</div>";
        break;
      case 'Project':
        entity = Projects.findOne(this.entityId);
        returnedData = "<div><i class='fa fa-fw fa-files-o'></i>" + entity.description + "</div>";
        break;
      case 'Purchase Order':
        entity = PurchaseOrders.findOne(this.entityId);
        returnedData = "<div><i class='fa fa-fw fa-shopping-cart'></i>" + entity.description + "</div>";
        break;
    }
    return returnedData;
  }
});
