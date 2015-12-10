Meteor.methods({

  'companiesHouse.search': function(companyName) {
    var companiesHouseApiKey = process.env.COMPANIESHOUSE_API_KEY;
    if (typeof companiesHouseApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No companies house API key set');
    }

    var baseurl = 'https://api.companieshouse.gov.uk/search/companies',
        auth = companiesHouseApiKey + ':';

    url = encodeURI(baseurl + '?q=' + companyName);

    return HTTP.get(url, {auth: auth});
  }

});
