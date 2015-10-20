Template.companyList.onCreated(function() {
  // Redirect if read permission changed
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
      $('.stick-bar input').val(searchQuery);
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
    return easySearchInstance.get('total') !== 1;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
