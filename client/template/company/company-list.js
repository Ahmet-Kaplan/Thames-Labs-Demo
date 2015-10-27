Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });

  $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
});

Template.companyList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('companyListSearchQuery', null);
  this.autorun(function() {
    var searchQuery = Session.get('companyListSearchQuery');
    if (searchQuery) {
      CompaniesIndex.getComponentMethods().search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });

  if (hopscotch.getState() === "welcome-tour:9") {
    hopscotch.startTour(welcomeTour);
  }
});

Template.companyList.helpers({
  companyCount: function() {
    return CompaniesIndex.getComponentDict().get('count');
  },
  hasMultipleCompanies: function() {
    return CompaniesIndex.getComponentDict().get('count') !== 1;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
