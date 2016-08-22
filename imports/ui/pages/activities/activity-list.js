import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/export/export.js';

import './activity-list.html';
import './activity-list.css';

import '/imports/ui/components/activity/activity-list-item.js';

Template.activityList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Activity List view');
      FlowRouter.go('/');
    }
  });
});