import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';

import './menu-button.html';

Template.menuButton.helpers({
  hasPermission: function() {
    const permissions = Template.currentData().permissions;
    const permissionList = _.split(permissions, ',');
    if (!Roles.userIsInRole(Meteor.userId(), permissionList) && permissions !== '') {
      return false;
    }
    return true;
  },
  hasFreeAccessOnly: function() {
    return (Template.currentData().proFeature && !isProTenant(Meteor.user().group));
  },
  id: function() {
    if (Template.currentData().linkId) {
      return Template.currentData().linkId;
    }
    return Template.currentData().page;
  }
});

Template.menuButton.events({
  'click .menu-button': function() {
    $("#id-view-sidemenu").removeClass("active");
  },
  'click .pro-feature': function() {
    showUpgradeToastr('To access ' + Template.currentData().title);
  }
});