Template.companies.onRendered(function() {
  $('.modal-trigger').leanModal();
});

Template.companies.helpers({
  companies: function () {
    var companyList = companies.reactive(),
    searchString = Session.get('companySearch');
    if (Session.get('showMyCompanies')) {
      companyList = companyList.filter(function(company) {
        return company.AccMgrID === Meteor.user().profile.UserID;
      });
    }
    if (searchString) {
      var index = lunr(function() {
        this.field('Company', { boost: 10 });
        this.field('Address');
        this.field('PostCode');
        this.field('City');
        this.ref('CompanyID');
      });
      companyList.forEach(function(company) {
        index.add(company);
      });
      var searchResults = index.search(searchString);
      searchResults = searchResults.map(function(result) {
        return lodash.find(companyList, function(company) {
          return company.CompanyID == result.ref;
        });
      });
      companyList = searchResults;
    }
    return companyList;
  },
  showMyCompanies: function() {
    return Session.get('showMyCompanies');
  },
  companySearch: function() {
    return Session.get('companySearch');
  },
  companySearchLabelClass: function() {
    return Session.get('companySearch') ? 'active' : '';
  }
});

Template.companies.events({
  'click a.add': function() {
    Meteor.call('addRandomCompany', function() {
      Materialize.toast('Test company added', 1000, 'teal');
    });
  },
  'click a.clear': function() {
    Meteor.call('clearRandomCompanies', function() {
      Materialize.toast('Test companies cleared', 1000, 'red');
    });
  },
  'change .switch input': function(event) {
    Session.set('showMyCompanies', event.target.checked);
  },
  'keyup #search, change #search': function(event) {
    Session.set('companySearch', event.target.value);
  }
});

Template.addCompanyModal.helpers({
  companySchema: function() {
    return Schema.company;
  },
  countryOptions: function() {
    return {
      'UK': 'United Kingdom',
      'USA': 'United States of America'
    }
    return countries.reactive().filter(function(country) {
      return country.Country != '';
    }).map(function(country) {
      return { label: country.Country, value: country.Country };
    });
  }
});

Template.companyDetail.helpers({
  addressString: function(company) {
    return encodeURIComponent([
      company.Address,
      company.City,
      company.Country,
      company.PostCode
    ].join(', '));
  }
})

Template.companyDetail.events({
  'click .delete-company': function(event) {
    var companyId = this.company.CompanyID;
    Meteor.call('deleteCompany', companyId, function() {
      Router.go('company');
      Materialize.toast('Company deleted', 2000, 'red');
    })
  }
});
