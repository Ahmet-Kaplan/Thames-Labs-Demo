import '/imports/ui/components/settings/nav/nav.html';
import '/imports/ui/components/settings/profile/password/change-password.js';
import '/imports/ui/components/settings/profile/email/change-email.js';
import '/imports/ui/components/settings/profile/username/change-username.js';
import '../settings.less';
import './profile.html';

Template.profileSettings.helpers({
  user: function() {
    return Meteor.user();
  }
});

Template.profileSettings.onCreated(function() {
  // Redirect if superadmin
  this.autorun(function() {
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) FlowRouter.go('tenants');
  });
});