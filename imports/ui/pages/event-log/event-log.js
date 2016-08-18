import './event-log.html';
import '/imports/ui/components/event-log/event-list-item.js';

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
