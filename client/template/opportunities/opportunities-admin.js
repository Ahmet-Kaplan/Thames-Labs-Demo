Template.opportunityAdmin.helpers({
  stages: function() {
    return OpportunityStages.find({}, {sort: { order: 1}});
  },
  options: {
    sort: true,
    sortField: 'order'
  }
});

Template.opportunityAdmin.events({
  'click #btnAddStage': function(event) {
    event.preventDefault();
    Modal.show('insertNewStageModal', this);
  }
});

Template.opportunityAdminStage.helpers({
  isFirstStage: function() {
    if (this.order == 0) return true;
    return false;
  }
});

Template.opportunityAdminStage.events({
  'click #btnEdit': function() {
    event.preventDefault();
    Modal.show('editStageModal', this);
  },

  'click #btnDelete': function(event) {
    event.preventDefault();
    var id = this._id;
    bootbox.confirm("Are you sure you wish to delete this stage?", function(result) {
      if (result === true) {
        Meteor.call('deleteOpportunityStage', id);
      }
    });
  }
});

Template.insertNewStageModal.helpers({
  orderValue: function() {
    return OpportunityStages.find().count();
  }
});
