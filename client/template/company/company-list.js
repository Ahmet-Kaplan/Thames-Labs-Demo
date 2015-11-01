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

Template.companyListItem.helpers({
  shortWebsite: function() {
    var website = this.website;

    // Remove http(s)://
    if(website.substring(0,4) === 'http') {
      website = website.substring(7);
    } else if(website.substring(0,5) === 'https') {
      website = website.substring(8);
    }

    // Remove www.
    website = website.replace('www.', '');
    if(website.length >= 14) {
      website = website.substring(0,11) + '...'
    }
    return website;
  }
})
