import './activity-timeline.html';
import './activity-timeline.css';
import './modals/activity-update-form.js';
import './modals/insert-activity-form.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';

import { Activities } from '/imports/api/collections.js';

import bootbox from 'bootbox';
import sanitizeHtml from "sanitize-html";



Template.activityTimeline.helpers({
  fromNow: function(date) {
    if (date) {
      return moment(date).fromNow();
    }
    return "Date/time not specified";
  },
  timelineClass: function(index) {
    return index % 2 === 0 ? 'timeline-inverted' : '';
  },
  timelineIcon: function(type) {
    const icons = {
      'note': 'file-text-o',
      'email': 'envelope-o',
      'call': 'phone',
      'Note': 'file-text-o',
      'Email': 'envelope-o',
      'Call': 'phone'
    };
    return icons[type];
  },
  content: function() {
    return sanitizeHtml(this.notes, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'h2' ])
    });
  },
  ownActivity: function(createdBy) {
    return createdBy === Meteor.userId();
  },
  otherUser: function(createdBy) {
    const user = Meteor.users.findOne({
      _id: createdBy
    });
    if(user && user.profile) return user.profile.name;
  },
  isPrimaryEntity: function() {
    if (!this.primaryEntityId || !this.primaryEntityType) return false;
    if (this.taskId) return true;

    const urlString = FlowRouter.current().path;
    return urlString.indexOf(this.primaryEntityId) > -1;
  },
  entityIcon: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'building';
      case 'contacts':
        return 'user';
      case 'opportunities':
        return 'lightbulb-o';
      case 'jobs':
        return 'sitemap';
      case 'purchaseorders':
        return 'shopping-cart';
      case 'tasks':
        return 'check';
    }
  },
  friendlyEntity: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'company';
      case 'contacts':
        return 'contact';
      case 'opportunities':
        return 'opportunity';
      case 'jobs':
        return 'job';
      case 'purchaseorders':
        return 'purchase order';
      case 'tasks':
        return 'task';
    }
  },
  routeName: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'company';
      case 'contacts':
        return 'contact';
      case 'opportunities':
        return 'opportunity';
      case 'jobs':
        return 'job';
      case 'purchaseorders':
        return 'purchaseOrder';
    }
  }
});

Template.activityTimeline.events({
  'click #edit-activity': function(event) {
    event.preventDefault();
    Modal.show('updateActivityModal', this);
  },
  'click #remove-activity': function(event) {
    event.preventDefault();
    const activityId = this._id;

    bootbox.confirm("Are you sure you wish to delete this activity?", function(result) {
      if (result === true) {
        Activities.remove(activityId);
        bootbox.hideAll();
      }
    });
  }
});
