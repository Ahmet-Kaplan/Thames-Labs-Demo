Template.companyList.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });
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
});

Template.companyList.helpers({
  hasCompanies: function() {
    return Companies.find({}).count() > 0;
  },
  companyCount: function() {
    return Companies.find({}).count();
  },
  hasMultipleCompanies: function() {
    return Companies.find({}).count() !== 1;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
