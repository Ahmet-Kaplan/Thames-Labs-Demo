import { Template } from 'meteor/templating';
import './tag-management-modal.js';
import './tag-management.html';

Template.tagManagement.onCreated(function() {
  Session.setDefault('resultsCount', 0);
});

Template.tagManagement.onRendered(function() {
  const collectionName = this.data.collectionName;
  this.autorun(function() {
    if (collectionName) {
      const index = Collections[collectionName].index;
      Session.set('resultsCount', index.getComponentDict().get('count'));
    }
  });
});


Template.tagManagement.events({
  'click #manage-tags': function(event, template) {
    this.recordCount = Session.get('resultsCount');
    Modal.show('tagManagementModal', this);
  }
});

Template.tagManagement.helpers({
  resultsCount: function() {
    return Session.get('resultsCount');
  }
});