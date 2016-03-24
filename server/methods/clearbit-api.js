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
    const Company = clearbit(clearbitApiKey).Company;
    var Future = Npm.require('fibers/future');
    var clearbitData = new Future();
    var query = {};
    var domainRegex = new RegExp('^(https?\://)?(www\.)?[a-z0-9\.-]+\.[a-z]{2,4}/?$');
    var domainQuery = null;

    if(queryString.match(domainRegex) !== null) {
      var domainSplit = queryString.replace(/https?\:\/\//, '').replace(/www\./, '').replace(' ', '').split('/');
      domainQuery = domainSplit[0]
    } 
    
    if(!!domainQuery && domainQuery.length > 0) {
      console.log("domain match");
      Company.find({
          domain: domainQuery
      }).then(function(search) {
        clearbitData.return({
          total: 1,
          results: [search]
        });
      }).catch(function(err) {
        clearbitData.return(false);
      });
    } else {
      console.log('name match');
      Meteor.call('companiesHouse.search.companies', queryString, function(err, res) {
        var results = {
          total: res.data.total_results,
          results: _.map(res.data.items, function(item, key) {
            return {
              id: key.toString(),
              name: item.title.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
              geo: {
                streetName: item.address.address_line_1 + (item.address.address_line_2 ? ' ' + item.address.address_line_2 : ''),
                city: item.address.locality,
                postalCode: item.address.postal_code,
                country: 'United Kingdom',
              }
            }
          })
        }
        clearbitData.return(results);
      })
    }


    return clearbitData.wait();
  }

});
