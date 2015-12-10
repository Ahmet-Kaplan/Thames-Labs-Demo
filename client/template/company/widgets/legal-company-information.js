// Expects arguments:
// - company - the company object

Template.legalCompanyInformation.onCreated(function() {
  this.companiesHouseSearchResults = new ReactiveVar([]);
  this.autorun( () => {
    var company = Template.currentData().company;
    if (company.companiesHouseId || company.country !== 'United Kingdom') {
      this.companiesHouseSearchResults.set([]);
      return;
    }
    console.log('fetching companies house data');
    Meteor.call('companiesHouse.search', company.name, (err, res) => {
      if (err) throw new Meteor.Error(err);
      this.companiesHouseSearchResults.set(res.data.items);
    });
  });
});

Template.legalCompanyInformation.helpers({
  shouldShow: function() {
    var companyNumber = Template.currentData().company.companiesHouseId,
        hasResults = Template.instance().companiesHouseSearchResults.get();
    return !!companyNumber || hasResults;
  },
  companiesHouseSearchResults: function() {
    var results = Template.instance().companiesHouseSearchResults.get();
    return results.map( (result) => {
      result.companyId = this.company._id;
      return result;
    });
  }
});

Template.legalCompanyInformation.events({
  'click a.unlink-record': function() {
    Companies.update(this.company._id, {
      $unset: { companiesHouseId: 1 }
    });
  }
});

Template.legalCompanyInformationSearchResult.events({
  'click a': function(e) {
    e.preventDefault();
    console.log(this);
    Companies.update(this.companyId, {
      $set: { companiesHouseId: this.company_number}
    });
    toastr.success('Record linked to Companies House');
  }
});
