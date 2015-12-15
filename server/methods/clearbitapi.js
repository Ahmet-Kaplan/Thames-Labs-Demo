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

  'clearbit.getCompanyAutoFill': function(entityWebsite) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;
    if(entityWebsite.substring(0, 4) != 'http'){
      entityWebsite = 'http://' + entityWebsite;
    }

    if (typeof clearbitApiKey === 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    var Future = Npm.require('fibers/future');
    var clearbitData = new Future();
    var url = Meteor.npmRequire('url');
    var domain = url.parse(entityWebsite).hostname;
    var requestUrl = 'https://company-stream.clearbit.com/v1/companies/domain/' + domain;
    var authToken = "Bearer " + clearbitApiKey;
    Meteor.http.get(requestUrl, {
       headers: {
          "Authorization": authToken
       }
    }, function(err, res) {
      if (err) {
        clearbitData.return(false);
      } else {
        clearbitData.return(_.clone(res.data, true));
      }
    });

    return clearbitData.wait();
  }

});
