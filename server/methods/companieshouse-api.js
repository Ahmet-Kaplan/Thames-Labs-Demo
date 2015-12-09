Meteor.methods({

  'companiesHouse.search': function(companyName) {
    var companiesHouseApiKey = process.env.COMPANIESHOUSE_API_KEY;
    if (typeof companiesHouseApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No companies house API key set');
    }
  }

});
