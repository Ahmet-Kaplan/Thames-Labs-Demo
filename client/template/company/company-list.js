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
      $('.stick-bar input').val(searchQuery);
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