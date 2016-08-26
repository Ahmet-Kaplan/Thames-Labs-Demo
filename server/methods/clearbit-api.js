import url from 'url';
import Future from 'fibers/future';
import { Companies, Contacts } from '/imports/api/collections.js';

Meteor.methods({

  getClearbitData: function(entityName, entityId) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;
    if (typeof clearbitApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    if (entityName === 'company') {
      var company = Companies.findOne(entityId);
      var domain = url.parse(company.website).hostname;
      const requestUrl = 'https://company-stream.clearbit.com/v1/companies/domain/' + domain;
      const authToken = "Bearer " + clearbitApiKey;
      Meteor.http.get(requestUrl, {
        headers: {
          "Authorization": authToken
        }
      }, function(err, res) {
        if (err) {
          Companies.update(entityId, {
            $unset: {
              'metadata.clearbit': ""
            }
          });
        } else {
          const clearbitData = _.cloneDeep(res.data);
          Companies.update(
            entityId, {
              $set: {
                'metadata.clearbit': clearbitData
              }
            }
          );
        }
      });

    } else if (entityName === 'contact') {
      var contact = Contacts.findOne(entityId);
      const requestUrl = 'https://person-stream.clearbit.com/v1/people/email/' + contact.email;
      const authToken = "Bearer " + clearbitApiKey;
      Meteor.http.get(requestUrl, {
        headers: {
          "Authorization": authToken
        }
      }, function(err, res) {
        if (err) {
          Contacts.update(entityId, {
            $unset: {
              'metadata.clearbit': ""
            }
          });
        } else {
          const clearbitData = _.cloneDeep(res.data);
          Contacts.update(
            entityId, {
              $set: {
                'metadata.clearbit': clearbitData
              }
            }
          );
        }
      });

    } else {
      throw new Meteor.Error('Not-supported', 'Error 500: Not found', 'Only company or contact lookup supported');
    }
  },

  'clearbit.getCompanyFromWebsite': function(queryString) {
    var clearbitApiKey = process.env.CLEARBIT_API_KEY;

    if (typeof clearbitApiKey === 'undefined') {
      throw new Meteor.Error(500, 'No clearbit API key set');
    }

    const Company = clearbit(clearbitApiKey).Company;
    var clearbitData = new Future();
    var domainRegex = new RegExp('^(https?\://)?(www\.)?[a-z0-9\.-]+\.[a-z]{2,4}/?$');
    var domainQuery = null;

    if (queryString.match(domainRegex) !== null) {
      var domainSplit = queryString.replace(/https?\:\/\//, '').replace(/www\./, '').replace(' ', '').split('/');
      domainQuery = domainSplit[0];
    }

    if (!!domainQuery && domainQuery.length > 0) {
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
      clearbitData.return(false);
    }

    return clearbitData.wait();
  }

});