Meteor.methods({

  'companiesHouse.search.companies': function(companyName) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'Must be logged in to search Companies House');
    }
    var companiesHouseApiKey = process.env.COMPANIESHOUSE_API_KEY;
    if (typeof companiesHouseApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No companies house API key set');
    }

    var baseurl = 'https://api.companieshouse.gov.uk/search/companies',
        auth = companiesHouseApiKey + ':';

    url = encodeURI(baseurl + '?q=' + companyName + '&items_per_page=10');

    return HTTP.get(url, {auth: auth});
  },

  'companiesHouse.company': function(companyNumber) {
    if (!this.userId) {
      throw new Meteor.Error(403, 'Must be logged in to search Companies House');
    }
    var companiesHouseApiKey = process.env.COMPANIESHOUSE_API_KEY;
    if (typeof companiesHouseApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No companies house API key set');
    }

    var baseurl = 'https://api.companieshouse.gov.uk/company/',
        auth = companiesHouseApiKey + ':';

    url = encodeURI(baseurl + companyNumber);

    return HTTP.get(url, {auth: auth});
  }

});
