import '/imports/ui/components/settings/nav/nav.html';
import '/imports/ui/components/settings/users/users.js';
import '../settings.less';
import './users.html';

Template.userSettings.helpers({
  user: function() {
    return Meteor.user();
  }
});

Template.userSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});