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
    return easySearchInstance.get('total') !== 0;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
