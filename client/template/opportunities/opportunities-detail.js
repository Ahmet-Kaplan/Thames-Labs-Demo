Template.opportunityDetail.helpers({
  stages: function() {
    return OpportunityStages.find({}, {sort: {order: 1}});
  }
});
