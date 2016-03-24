Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });
});

Template.companyList.helpers({
  companyCount: function() {
      
    this.autorun(function() {
        return Collections['companies'].index.getComponentDict().get('count');
    });
  },
  hasMultipleCompanies: function() {
      
    this.autorun(function() {
        return Collections['companies'].index.getComponentDict().get('count') !== 1;
    });
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
