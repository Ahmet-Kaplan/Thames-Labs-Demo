Template.insertOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
	firstStageId: function() {
    var id = OpportunityStages.findOne({"order": 0})._id;
    console.log(id);
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  }
});
