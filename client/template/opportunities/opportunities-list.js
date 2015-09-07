Template.opportunityList.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });
});

Template.opportunityList.onDestroyed(function() {
  Session.set('opportunitySearchQuery', null);
  Session.set('opportunitySearchShowArchived', false);
  EasySearch.changeProperty('opportunities', 'showArchived', false);
});

Template.opportunityList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('opportunitySearchQuery', null);
  Session.set('opportunitySearchShowArchived', false);
  EasySearch.changeProperty('opportunities', 'showArchived', false);
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
  },
  archivedShown: function() {
    return Session.get('opportunitySearchShowArchived');
  }
});

Template.opportunityList.events({
  'click #create-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityModal');
  },
  'click #toggle-archived': function(event) {
    event.preventDefault();
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'opportunities'
    });
    if (EasySearch.getIndex('opportunities').props.showArchived) {
      Session.set('opportunitySearchShowArchived', false);
      EasySearch.changeProperty('opportunities', 'showArchived', false);
    } else {
      Session.set('opportunitySearchShowArchived', true);
      EasySearch.changeProperty('opportunities', 'showArchived', true);
    }
    easySearchInstance.triggerSearch();
  }
});
