Template.insertActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});
Template.insertContactActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});
Template.insertProjectActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});
Template.insertPurchaseOrderActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});
Template.insertOpportunityActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});
Template.insertTaskActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanCreateActivities'])) {
    toastr.warning("You do not have permission to create activities");
    Modal.hide();
    return;
  }
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'))
});

Template.insertActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertContactActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  },
  fullName: function() {
    return this.contact.forename + " " + this.contact.surname;
  }
});

Template.insertProjectActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertPurchaseOrderActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertOpportunityActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

Template.insertTaskActivityModal.helpers({
  currentEntity: function() {
    return this.task.entityType;
  },
  currentEntityId: function() {
    return this.task.entityId;
  },
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});
