Meteor.methods({

  changeStageOrder: function(stageId, direction) {
    var user = Meteor.users.find(this.userId);
    Partitioner.bindGroup(user.group, function() {
      var userTenant = Tenants.findOne({});
      var currentStages = userTenant.settings.opportunity.stages;
      var step = (direction === "up" ? -1 : 1);

      _.each(currentStages, function(cs, i) {
        if (!cs.order) cs.order = i;
      });

      var currentOrder = currentStages.sort(function(a, b) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });

      var index = -1;
      _.each(currentOrder, function(co, i) {
        if (co.id === stageId) index = i;
      });
      var GaiaRecord = currentOrder[index];

      GaiaRecord.order = GaiaRecord.order + step;

      if (GaiaRecord.order < 0 || GaiaRecord.order > currentOrder.length - 1) {
        throw new Meteor.Error('Beyond bounds');
      }

      _.each(currentOrder, function(co, i) {
        if (co.id !== stageId) {
          if (co.order === GaiaRecord.order) {
            co.order = co.order - step;
          }
        }
      });

      Tenants.update(userTenant._id, {
        $set: {
          'settings.opportunity.stages': currentOrder
        }
      });

    });

  },

  deleteOpportunityStage: function(stageId) {
    var user = Meteor.users.find(this.userId);
    Partitioner.bindGroup(user.group, function() {
      var userTenant = Tenants.findOne({});
      var currentStages = userTenant.settings.opportunity.stages;
      var stageIndex = _.findIndex(currentStages, {
        id: stageId
      });

      if (stageIndex !== -1) {
        _.pullAt(currentStages, stageIndex);
        Tenants.update(userTenant._id, {
          $set: {
            'settings.opportunity.stages': currentStages
          }
        });
      }

    });
  },

  checkStageInUse: function(stageId) {
    var user = Meteor.users.find(this.userId);
    return Partitioner.bindGroup(user.group, function() {
      if (Opportunities.find({
          currentStageId: stageId
        }).count() > 0) {
        return true;
      }
      return false;
    });
  },

  createDefaultOpportunityStages: function() {

    var user = Meteor.users.find(this.userId);
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var stages = userTenant.settings.opportunity.stages;
        if (!stages || stages.length === 0) {
          var defaultStages = [{
            title: "Exploration",
            description: "Exploring whether there is a need that your product or service can fulfill",
            id: 0
          }, {
            title: "Fact finding",
            description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
            id: 1
          }, {
            title: "Solution",
            description: "Preparing your solution based on what you know from your fact finding",
            id: 2
          }, {
            title: "Negotiation",
            description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
            id: 3
          }, {
            title: "Objections",
            description: "Dealing with any objections to the negotiated solution in order to win the business",
            id: 4
          }];

          Tenants.update({
            _id: userTenant._id
          }, {
            $set: {
              "settings.opportunity.stages": defaultStages
            }
          });
        }
      }
    }
  }

});