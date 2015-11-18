Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
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
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('companies');
  }
});
