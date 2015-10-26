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
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'companies'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });

  if (hopscotch.getState() === "welcome-tour:9") {
    hopscotch.startTour(welcomeTour);
  }
});

Template.companyList.helpers({
  companyCount: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'companies'
    });
    return easySearchInstance.get('total');
  },
  hasMultipleCompanies: function() {
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'companies'
    });
    return easySearchInstance.get('total') !== 1;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
