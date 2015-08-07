Template.opportunityDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var opp = Opportunities.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && opp === undefined) {
      FlowRouter.go('opportunities');
    }
  });
});

Template.opportunityDetail.helpers({
  stages: function() {
    return OpportunityStages.find({}, {sort: {order: 1}});
  },
  oppData: function() {
    return Opportunities.findOne({_id: FlowRouter.getParam('id')})
  },
  isNotFirstStage: function() {
    var currentStage = this.currentStageId;
    var firstId = OpportunityStages.findOne({"order": 0})._id;
    if (currentStage == firstId) return false;
    return true;
  },
  isLastStage: function() {
    var currentStage = this.currentStageId;
    var finalStageOrder = OpportunityStages.find({}).count() - 1;
    var stageId = OpportunityStages.findOne({},{sort:{order:-1}})._id;
    if (currentStage == stageId) return true;
    return false;
  },
  isActive: function() {
    return !this.isArchived;
  }
});

Template.opportunityDetail.events({
  'click #btnLostOpportunity': function() {
    Opportunities.update(this._id, { $set: {
      isArchived: true,
      isAccepted: false
    }});
  }
});

Template.opportunityStage.helpers({
  isCurrentStep: function() {
    var id = FlowRouter.getParam('id');
    var stepId = Opportunities.findOne({_id: id}).currentStageId;
    if (stepId == this._id) return true;
    return false;
  }
})