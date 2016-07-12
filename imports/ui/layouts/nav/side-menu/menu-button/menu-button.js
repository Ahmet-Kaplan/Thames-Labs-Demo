import './menu-button.html';
import _ from 'lodash';

Template.menuButton.helpers({
  hasPermission: function() {
    const permissions = Template.currentData().permissions;
    const permissionList = _.split(permissions, ',');
    console.log(permissionList);
    if (!Roles.userIsInRole(Meteor.userId(), permissionList) && permissions !== '') {
      return false;
    }
    return true;
  },
  hasFreeAccessOnly: function() {
    return (Template.currentData().proFeature && !isProTenant());
  }
});

Template.menuButton.events({
  'click .proFeature': function() {
    showUpgradeToastr('To access ' + Template.currentData().title);
  }
});