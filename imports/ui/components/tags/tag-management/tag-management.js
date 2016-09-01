import { Template } from 'meteor/templating';
import './tag-management-modal.js';
import './tag-management.html';

Template.tagManagement.onCreated(function() {
  this.resultsCount = new ReactiveVar(0);
});

Template.tagManagement.onRendered(function() {
  const collectionName = this.data.collectionName;
  this.autorun(() => {
    if (collectionName) {
      const index = Collections[collectionName].index,
            count = index.getComponentDict().get('count');
      this.resultsCount.set(count);
    }
  });
});

Template.tagManagement.helpers({
  resultsCount: function() {
    return Session.get('resultsCount');
  }
});

Template.tagManagement.events({
  'click #manage-tags': function(event, template) {
    Modal.show('tagManagementModal', this);
  }
});
