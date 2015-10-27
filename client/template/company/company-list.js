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
    if (searchQuery) {
      CompaniesIndex.getComponentMethods().search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
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
  },
  'click #export-companies': function(event) {
    event.preventDefault();
    var searchDefinition = CompaniesIndex.getComponentDict().get('searchDefinition'),
        searchOptions = CompaniesIndex.getComponentDict().get('searchOptions');
    Meteor.call('search.export', searchDefinition, searchOptions, (err, result) => {
      result.forEach( (result) => {
        console.log(result);
      });
    });
  }
});
