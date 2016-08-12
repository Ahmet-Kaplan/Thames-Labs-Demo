import { redirectWithoutPermission } from '/imports/api/global-helpers/permissions-helpers.js';
import './configuration.html';
import '/imports/ui/components/settings/configuration/configuration.js';
import '../settings.less';

Template.configurationSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});