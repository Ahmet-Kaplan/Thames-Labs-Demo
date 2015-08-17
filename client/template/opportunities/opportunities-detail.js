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
  //  var finalStageOrder = OpportunityStages.find({}).count() - 1;
    var lastStageId = OpportunityStages.findOne({},{ sort: { order: -1}})._id;
    if (currentStage == lastStageId) return true;
    return false;
  },
  isActive: function() {
    return !this.isArchived;
  },
  getItems: function() {
    var items = [];
    for(var i = 0; i < this.items.length; i++) {
      var item = {
        index: i,
        oppId: this._id,
        data: this.items[i]
      };
      items.push(item);
    }
    return items;
  }
});

Template.opportunityDetail.events({
  'click #btnNextStage': function() {
    var currentStage = OpportunityStages.findOne(this.currentStageId);
    var nextStageIndex = currentStage.order + 1;
    var nextStageId = OpportunityStages.findOne({ order: nextStageIndex })._id;
    Opportunities.update(this._id, { $set: {
      currentStageId: nextStageId
    }});
  },
  'click #btnPrevStage': function() {
    var currentStage = OpportunityStages.findOne(this.currentStageId);
    var nextStageIndex = currentStage.order - 1;
    var nextStageId = OpportunityStages.findOne({ order: nextStageIndex })._id;
    Opportunities.update(this._id, { $set: {
      currentStageId: nextStageId
    }});
  },
  'click #btnLostOpportunity': function(event) {
    event.preventDefault();
    var oppId = this._id;
    bootbox.confirm("Are you sure you wish to mark this opportunity as lost? This action is not reversible.", function(result) {
      if (result === true) {
        Opportunities.update(oppId, { $set: {
          isArchived: true,
          hasBeenWon: false
        }});
      }
    });
  },
  'click #btnWonOpp': function(event) {
    event.preventDefault();
    var oppId = this._id;
    bootbox.confirm("Are you sure you wish to mark this opportunity as won? This action is not reversible.", function(result) {
      if (result === true) {
        Opportunities.update(oppId, { $set: {
          isArchived: true,
          hasBeenWon: true
        }});
      }
    });
  },
  'click #editOpportunity': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityModal', this);
  },
  'click #removeOpportunity': function(event) {
    event.preventDefault();
    var oppId = this._id;

    bootbox.confirm("Are you sure you wish to delete this opportunity?", function(result) {
      if (result === true) {
        Opportunities.remove(oppId);
      }
    });
  },
  'click #btnAddLine': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityItemModal', this);
  }
});

Template.opportunityStage.helpers({
  isCurrentStep: function() {
    var id = FlowRouter.getParam('id');
    var stepId = Opportunities.findOne({_id: id}).currentStageId;
    if (stepId == this._id) return true;
    return false;
  }
});

Template.opportunityItem.helpers({
  isActive: function() {
    return !Opportunities.findOne(this.oppId).isArchived;
  }
});

Template.opportunityItem.events({
  'click .btnEditOppItem': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityItemModal', this);
  },
  'click .btnDeleteOppItem': function(event) {
    event.preventDefault();
    var oppId = this.oppId;
    var item = this.data;

    bootbox.confirm("Are you sure you wish to delete this opportunity line item?", function(result) {
      if (result === true) {
        Opportunities.update(oppId, {
          "$pull": {
            "items": item
          }
        });
      }
    });
  }
});
