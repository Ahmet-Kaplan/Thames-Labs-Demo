Template.companies.helpers({
  companies: function () {
    var companies = Companies.find({});
    return companies;
  },
});

Template.companies.events({
  'click .add-random': function() {
    Meteor.call('addRandomCompany');
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
});
