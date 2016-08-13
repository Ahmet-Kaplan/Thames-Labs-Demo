import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import './configuration.html';
import '/imports/ui/components/settings/configuration/configuration.js';
import '../settings.less';

Template.configurationSettings.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});