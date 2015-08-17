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

Template.opportunityList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  // Watch for session variable setting search
  Session.set('opportunitySearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('opportunitySearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'opportunities'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
});

Template.opportunityList.helpers({
  hasOpportunities: function() {
    return Opportunities.find({}).count() > 0;
  },
  opportunityCount: function() {
    return Opportunities.find({}).count();
  },
  hasMultipleOpportunities: function() {
    return Opportunities.find({}).count() !== 1;
  }
});

Template.opportunityList.events({
	'click #create-opportunity': function() {
		event.preventDefault();
    if (!OpportunityStages.find().count() > 0) {
      bootbox.alert("The sales pipeline for your company must be setup before you can use opportunities.")
    } else {
      Modal.show('insertOpportunityModal');
    }
	}
});
