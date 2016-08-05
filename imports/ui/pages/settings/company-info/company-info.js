import './company-info.html';
import '/imports/ui/components/settings/company-info/company-info.js';
import '../settings.less';

Template.configurationSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});