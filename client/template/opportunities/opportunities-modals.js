Template.insertOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
	firstStageId: function() {
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  }
});

Template.editOpportunityItemModal.helpers({
  opportunity: function() {
    return Opportunities.findOne(this.oppId);
  },
  fieldName: function() {
    return "items." + this.index + ".name";
  },
  fieldDesc: function() {
    return "items." + this.index + ".description";
  },
  fieldVal: function() {
    return "items." + this.index + ".value";
  }
})

Template.insertCompanyOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
	firstStageId: function() {
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  }
});

Template.insertContactOpportunityModal.helpers({
  emptyArray: function() {
    return [];
  },
	firstStageId: function() {
    var id = OpportunityStages.findOne({"order": 0})._id;
    return id;
  },
  createdBy: function() {
    return Meteor.userId();
  }
});
