Template.activityTimeline.helpers({
  fromNow: function(date) {
    if (date) {
      return moment(date).fromNow();
    } else {
      return "Date/time not specified";
    }
  },
  timelineClass: function(index) {
    return index % 2 == 0 ? 'timeline-inverted' : '';
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
})
