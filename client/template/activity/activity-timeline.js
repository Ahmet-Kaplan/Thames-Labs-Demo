Template.activityTimeline.helpers({
  fromNow: function(date) {
    if (date) {
      return moment(date).fromNow();
    } else {
      return "Date/time not specified";
    }
  },
  timelineClass: function(index) {
    return index % 2 === 0 ? 'timeline-inverted' : '';
  },
  timelineIcon: function(type) {
    var icons = {
      'note': 'file-text-o',
      'email': 'envelope-o',
      'call': 'phone',
      'Note': 'file-text-o',
      'Email': 'envelope-o',
      'Call': 'phone'
    };
    return icons[type];
  },
  content: function() {
    return UniHTML.purify(this.notes);
  },
  ownActivity: function(createdBy) {
    return createdBy === Meteor.userId();
  },
  otherUser: function(createdBy) {
    return Meteor.users.findOne({
      _id: createdBy
    }).profile.name;
  },
  isPrimaryEntity: function() {
    if (!this.primaryEntityId || !this.primaryEntityType) return false;
    if (this.taskId) return true;

    var urlString = FlowRouter.current().path;
    return urlString.indexOf(this.primaryEntityId) > -1;
  },
  entityIcon: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'building';
      case 'contacts':
        return 'user';
      case 'opportunities':
        return 'lightbulb-o';
      case 'projects':
        return 'sitemap';
      case 'purchaseorders':
        return 'shopping-cart';
      case 'tasks':
        return 'check';
    }
  },
  friendlyEntity: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'company';
      case 'contacts':
        return 'contact';
      case 'opportunities':
        return 'opportunity';
      case 'projects':
        return 'project';
      case 'purchaseorders':
        return 'purchase order';
      case 'tasks':
        return 'task';
    }
  },
  routeName: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'company';
      case 'contacts':
        return 'contact';
      case 'opportunities':
        return 'opportunity';
      case 'projects':
        return 'project';
      case 'purchaseorders':
        return 'purchaseOrder';
    }
  }
});

Template.activityTimeline.events({
  'click #edit-activity': function(event) {
    event.preventDefault();
    Modal.show('updateActivityModal', this);
  },
  'click #remove-activity': function(event) {
    event.preventDefault();
    var activityId = this._id;

    bootbox.confirm("Are you sure you wish to delete this activity?", function(result) {
      if (result === true) {
        Activities.remove(activityId);
        bootbox.hideAll();
      }
    });
  }
});
