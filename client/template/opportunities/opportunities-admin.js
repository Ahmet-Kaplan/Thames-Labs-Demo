Template.opportunityAdmin.helpers({
  stages: function() {
  /*  OpportunityStages.insert({
      title: "Stage Name",
      description: "Description",
      sortOrder: 0
    }); */
    return OpportunityStages.find({});
  },
  options: function() {
    return {
        sort: true
    };
  }
});
