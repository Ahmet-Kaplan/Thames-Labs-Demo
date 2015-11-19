Meteor.methods({

  deleteOpportunityStage: function(stageId) {
    var user = Meteor.users.find(this.userId);
    Partitioner.bindGroup(user.group, function() {
      var userTenant = Tenants.findOne({});
      var currentStages = userTenant.settings.opportunity.stages.sort(function(a, b) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });

      var newStages = [];
      _.each(currentStages, function(cs) {
        if (cs.id !== stageId) newStages.push(cs);
      });

      _.each(newStages, function(newStage, i) {
        newStage.order = i;
      });

      // Tenants.update(userTenant._id, {
      //   $set: {
      //     'settings.opportunity.stages': newStages
      //   }
      // });

    });
  },

  checkStageInUse: function(stageId) {
    var user = Meteor.users.find(this.userId);
    return Partitioner.bindGroup(user.group, function() {
      console.log(Opportunities.find({}));
      
      if (Opportunities.find({
          currentStageId: stageId
        }).count() > 0) {
        return true;
      };
      return false;
    });
  },

  createDefaultOpportunityStages: function() {
    // ##MARKER##

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
            order: 0,
            id: 0
          }, {
            title: "Fact finding",
            description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
            order: 1,
            id: 1
          }, {
            title: "Solution",
            description: "Preparing your solution based on what you know from your fact finding",
            order: 2,
            id: 2
          }, {
            title: "Negotiation",
            description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
            order: 3,
            id: 3
          }, {
            title: "Objections",
            description: "Dealing with any objections to the negotiated solution in order to win the business",
            order: 4,
            id: 4
          }];

          Tenants.update({
            _id: userTenant._id
          }, {
            $set: {
              "settings.opportunity.stages": defaultStages
            }
          })
        }
      }
    }
  }

});
