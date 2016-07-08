import '/imports/ui/components/settings/nav/nav.html';

import '../settings.less';
import './organization.html';

Template.organizationSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});