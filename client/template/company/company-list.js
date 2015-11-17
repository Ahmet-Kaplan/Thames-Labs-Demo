Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });

	console.log(hopscotch.getState());

  if(hopscotch.getState() !== null) {
		if (hopscotch.getState().indexOf("welcome-tour:9") > -1) {
      $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
		}
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
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('companies');
  }
});
