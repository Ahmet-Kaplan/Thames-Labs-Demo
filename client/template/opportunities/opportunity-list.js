Template.opportunityList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });
  // Search props
  this.showArchived = new ReactiveVar(false);
});

Template.opportunityList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('opportunitySearchQuery', null);
  this.autorun(function() {
    var searchQuery = Session.get('opportunitySearchQuery');
    if (searchQuery) {
      OpportunitiesIndex.getComponentMethods().search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
  // Update search props if reactive vars changed
  this.autorun( () => {
    var searchComponent = OpportunitiesIndex.getComponentMethods();
    if (this.showArchived.get()) {
      searchComponent.addProps('showArchived', 'true');
    } else {
      searchComponent.removeProps('showArchived');
    }
  });
});

Template.opportunityList.helpers({
  opportunityCount: function() {
    return OpportunitiesIndex.getComponentDict().get('count');
  },
  hasMultipleOpportunities: function() {
    return OpportunitiesIndex.getComponentDict().get('count') != 1;
  },
  archivedShown: function() {
    return Template.instance().showArchived.get();
  }
});

Template.opportunityList.events({
  'click #create-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityModal');
  },
  'click #toggle-archived': function(event) {
    event.preventDefault();
    var showArchived = Template.instance().showArchived.get();
    Template.instance().showArchived.set(!showArchived);
  }
});
