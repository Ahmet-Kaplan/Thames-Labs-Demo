import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import '/imports/ui/components/export/export.js';

import './activity-list.html';
import './activity-list.css';

import '/imports/ui/components/activity/activity-list-item.js';

Template.activityList.onCreated(function() {
  this.totalActivities = new ReactiveVar(0);
});

Template.activityList.onRendered(function() {
  this.autorun(() => {
    this.totalActivities.set(Collections['activities'].index.getComponentDict().get('count'));
  });
});

Template.activityList.helpers({
  activityCount: function() {
    return Template.instance().totalActivities.get();
  },
  hasMultipleActivities: function() {
    return Template.instance().totalActivities.get() !== 1;
  }
});
