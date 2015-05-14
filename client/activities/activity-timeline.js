Template.activityTimeline.helpers({
  fromNow: function(date) {
    return moment(date).fromNow();
  },
  timelineClass: function(index) {
    return index % 2 == 0 ? 'timeline-inverted' : '';
  },
  timelineIcon: function(type) {
    var icons = {
      'note': 'file-text-o',
      'email': 'envelope-o',
      'call': 'phone'
    };
    return icons[type];
  }
});

Template.activityTimeline.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
