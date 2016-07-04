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
  }
});