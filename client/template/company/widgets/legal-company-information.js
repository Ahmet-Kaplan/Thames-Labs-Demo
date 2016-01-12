// Expects arguments:
// - company - the company object

// see https://github.com/companieshouse/api-enumerations/blob/master/constants.yml
var companiesHouseEnumerations = {
  "company_type": {
    "private-unlimited": "private unlimited company",
    "ltd": "Private Limited Company",
    "plc": "Public Limited Company",
    "old-public-company": "Old Public Company",
    "private-limited-guarant-nsc-limited-exemption": "Private limited by guarantee without share capital, use of 'Limited' exemption",
    "limited-partnership": "Limited Partnership",
    "private-limited-guarant-nsc": "Private limited by guarantee without share capital",
    "converted-or-closed": "Converted / Closed",
    "private-unlimited-nsc": "Private unlimited company without share capital",
    "private-limited-shares-section-30-exemption": "Private limited company, use of 'Limited' exemption",
    "assurance-company": "Assurance Company",
    "oversea-company": "overseas company",
    "eeig": "European Economic Interest Grouping (EEIG)",
    "icvc-securities": "Investment Company with Variable Capital",
    "icvc-warrant": "Investment Company with Variable Capital",
    "icvc-umbrella": "Investment Company with Variable Capital",
    "industrial-and-provident-society": "Industrial and Provident Society",
    "northern-ireland": "Northern Ireland Company",
    "northern-ireland-other": "Credit Union (Northern Ireland)",
    "llp": "Limited Liability Partnership",
    "royal-charter": "Royal Charter Company",
    "investment-company-with-variable-capital": "investment company with variable capital",
    "unregistered-company": "unregistered company",
    "other": "Other Company Type",
    "european-public-limited-liability-company-se": "European Public Limited-Liability Company (SE)"
  },
  "company_status": {
    "active": "Active",
    "dissolved": "Dissolved",
    "liquidation": "Liquidation",
    "receivership": "Receivership",
    "converted-closed": "Converted / Closed",
    "voluntary-arrangement": "Voluntary Arrangement",
    "insolvency-proceedings": "Insolvency Proceedings",
    "administration": "In Administration"
  }
};

Template.legalCompanyInformation.onCreated(function() {
  this.companiesHouseSearchResults = new ReactiveVar([]);
  this.companiesHouseSearchResultsCount = new ReactiveVar(null);

  // Update companies house search if details change
  this.autorun( () => {
    var company = Template.currentData().company;
    if (company.companiesHouseId || company.country !== 'United Kingdom') {
      return;
    }
    Meteor.call('companiesHouse.search.companies', company.name, (err, res) => {
      if (err) throw new Meteor.Error(err);
      this.companiesHouseSearchResults.set(res.data.items);
      this.companiesHouseSearchResultsCount.set(res.data.total_results);
    });
  });

  // Refresh company data from companies house
  // Just watch companiesHouseId to prevent unwanted API calls
  this.autorun( () => {
    var companiesHouseId = Template.currentData().company.companiesHouseId;
    if (!companiesHouseId) return;
    Meteor.call('companiesHouse.company', companiesHouseId, (err, res) => {
      if (err) throw new Meteor.Error(err);
      Companies.update(
        this.data.company._id,
        { $set: { 'metadata.companiesHouse': res.data }}
      );
    });
  });
});

Template.legalCompanyInformation.helpers({
  shouldShow: function() {
    if (!Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])) return false;
    var companyNumber = Template.currentData().company.companiesHouseId,
        hasResults = Template.instance().companiesHouseSearchResultsCount.get();
    return !!companyNumber || (hasResults && Roles.userIsInRole(Meteor.userId(), ['CanEditCompanies']));
  },
  companiesHouseSearchResults: function() {
    var results = Template.instance().companiesHouseSearchResults.get();
    return results.map( (result) => {
      result.companyId = this.company._id;
      return result;
    });
  },
  companiesHouseSearchResultsCount: function() {
    return Template.instance().companiesHouseSearchResultsCount.get();
  },
  companiesHouseSearchResultsNotShown: function() {
    var results = Template.instance().companiesHouseSearchResults.get(),
        totalCount = Template.instance().companiesHouseSearchResultsCount.get();
    return totalCount > results.length ? totalCount - results.length : 0;
  },
  pluralResults: function() {
    return Template.instance().companiesHouseSearchResults.get().length != 1;
  },
  companiesHouseEnumerate: function(section, key) {
    return companiesHouseEnumerations[section][key];
  },
  statusWarning: function() {
    // n.b. - we're calling this in company.metadata.companiesHouse context!
    if (this.company_status !== 'active') return true;
    return false;
  }
});

Template.legalCompanyInformation.events({
  'click a.unlink-record': function(e) {
    e.preventDefault();
    Companies.update(this.company._id, {
      $unset: { companiesHouseId: 1 }
    });
    toastr.success('Link to Companies House removed');
  }
});

Template.legalCompanyInformationSearchResult.events({
  'click a': function(e) {
    e.preventDefault();
    Companies.update(this.companyId, {
      $set: {
        companiesHouseId: this.company_number
      }
    });
    toastr.success('Record linked to Companies House');
  }
});
