Template.opportunityAdmin.helpers({
  stages: function() {
    return Tenants.findOne({}).settings.opportunity.stages;
  },
  hasStages: function() {
    var userTenant = Tenants.findOne({});
    var stages = userTenant.settings.opportunity.stages;
    if (!stages) return false;
    return stages.length > 0;
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
    var stages = Tenants.findOne({}).settings.opportunity.stages;
    if (_.findIndex(stages, this) === 0) return true;
    return false;
  },
  isLastStage: function() {
    var stages = Tenants.findOne({}).settings.opportunity.stages;
    var maxVal = stages.length - 1;
    if (_.findIndex(stages, this) == maxVal) return true;
    return false;
  }
});

Template.opportunityAdminStage.events({
  'click #orderUp': function() {
    Meteor.call('changeStageOrder', this.id, "up");
  },
  'click #orderDown': function() {
    Meteor.call('changeStageOrder', this.id, "down");
  },
  'click #btnEdit': function() {
    event.preventDefault();
    Modal.show('editStageModal', this);
  },

  'click #btnDelete': function(event) {
    event.preventDefault();
    var userTenant = Tenants.findOne({});
    var stages = userTenant.settings.opportunity.stages;
    var count = stages.length;
    if (count == 1) {
      bootbox.alert("You must have at least one opportunity stage.");
      return;
    }

    var id = this.id;
    Meteor.call('checkStageInUse', id, function(error, result) {
      if (error) throw new Meteor.Error(error);
      if (result === true) {
        bootbox.alert("This opportunity stage is currently in use, and cannot be deleted.");
        return;
      } else {
        bootbox.confirm("Are you sure you wish to delete this stage?", function(result) {
          if (result === true) {
            Meteor.call('deleteOpportunityStage', id);
          }
        });
      }
    });
  }
});
