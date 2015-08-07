Template.opportunityAdmin.helpers({
  stages: function() {
    return OpportunityStages.find({});
  },
  options: {
    sort: true,
    sortField: 'order'
  }
});
