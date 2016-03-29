import url from 'url';

Meteor.methods({

  getClearbitData: function(entityName, entityId) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;
    if (typeof clearbitApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    if (entityName === 'company') {
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
  }

});
