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
