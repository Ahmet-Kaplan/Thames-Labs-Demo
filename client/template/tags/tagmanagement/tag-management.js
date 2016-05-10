Template.tagManagement.onCreated(function() {
  Session.setDefault('resultsCount', 0);
});

Template.tagManagement.onRendered(function() {
  var collectionName = this.data.collectionName;
  this.autorun(function() {
    if (collectionName) {
      var index = Collections[collectionName].index;
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