Meteor.methods({

  createOpportunityStages: function() {
    var count = OpportunityStages.find({}).count();
    if (count == 0) {
      OpportunityStages.insert({
        title: "Exploration",
        description: "Exploring whether there is a need that your product or service can fulfill",
        order: 0
      });
      OpportunityStages.insert({
        title: "Fact finding",
        description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
        order: 1
      });
      OpportunityStages.insert({
        title: "Solution",
        description: "Preparing your solution based on what you know from your fact finding",
        order: 2
      });
      OpportunityStages.insert({
        title: "Negotiation",
        description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
        order: 3
      });
      OpportunityStages.insert({
        title: "Objections",
        description: "Dealing with any objections to the negotiated solution in order to win the business",
        order: 4
      });
    }
  }

});
