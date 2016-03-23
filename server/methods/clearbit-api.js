Meteor.methods({

  getClearbitData: function(entityName, entityId) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;
    if (typeof clearbitApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    if (entityName === 'company') {
      var url = Meteor.npmRequire('url');
      var company = Companies.findOne(entityId);
      var domain = url.parse(company.website).hostname;
      var requestUrl = 'https://company-stream.clearbit.com/v1/companies/domain/' + domain;
      var authToken = "Bearer " + clearbitApiKey;
      Meteor.http.get(requestUrl, {
         headers: {
            "Authorization": authToken
         }
      }, function(err, res) {
        if (err) {
          Companies.update(entityId, { $unset: { 'metadata.clearbit': "" }});
        } else {
          var clearbitData = _.clone(res.data, true);
          Companies.update(
            entityId,
            { $set: { 'metadata.clearbit': clearbitData }}
          );
        }
      });

    } else if (entityName === 'contact') {
        var url = Meteor.npmRequire('url');
        var contact = Contacts.findOne(entityId);
        var requestUrl = 'https://person-stream.clearbit.com/v1/people/email/' + contact.email;
        var authToken = "Bearer " + clearbitApiKey;
        Meteor.http.get(requestUrl, {
           headers: {
              "Authorization": authToken
           }
        }, function(err, res) {
          if (err) {
            Contacts.update(entityId, { $unset: { 'metadata.clearbit': "" }});
          } else {
            var clearbitData = _.clone(res.data, true);
            Contacts.update(
              entityId,
              { $set: { 'metadata.clearbit': clearbitData }}
            );
          }
        });

    } else {
      throw new Meteor.Error('Not-supported', 'Error 500: Not found', 'Only company or contact lookup supported');
    }
  },

  'clearbit.getCompanyFromNameOrWebsite': function(queryString) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;

    if (typeof clearbitApiKey === 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    const Discovery = clearbit(clearbitApiKey).Discovery;
    var Future = Npm.require('fibers/future');
    var clearbitData = new Future();
    var query = {};
    var url = Meteor.npmRequire('url');
    var domainRegex = new RegExp('^(https?\://)?(www\.)?[a-z0-9\.-]+\.[a-z]{2,4}/?$');
    var domainQuery = null;

    if(queryString.match(domainRegex) !== null && url.parse(queryString).host) {
      domainQuery = url.parse(queryString).host.trim();
    } 
    
    if(!!domainQuery && domainQuery.length > 0) {
      query.domain = domainQuery;
    } else {
      query.name = queryString;
    }

    Discovery.search({query}).then(function(search) {
      clearbitData.return(search);
    });

    return clearbitData.wait();
  }

});
