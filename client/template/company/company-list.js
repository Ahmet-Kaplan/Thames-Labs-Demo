Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });
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
