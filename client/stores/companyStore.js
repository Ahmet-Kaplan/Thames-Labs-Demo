var Reflux = require('reflux');
var request = require('superagent');
var _ = require('underscore');

var actions = require('../actions/actions');
var userStore = require('./userStore');

var companyStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.data = [];
    var cache = localStorage.getItem('companies');
    if (cache) { this.data = JSON.parse(cache); }
  },

  onCompanyListUpdate: function() {
    request
      .get('/api/1.0/company/')
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        } else {
          this.data = res.body;
          this.trigger(this.data);
          localStorage.setItem('companies', JSON.stringify(this.data));
        }
      }.bind(this));
  },

  onCompanyUpdate: function(companyId) {
    request
      .get('/api/1.0/company/' + companyId)
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        } else {
          this.data = _.reject(this.data, function(company) {
            return company.CompanyID === companyId;
          });
          this.data.push(res.body);
          this.trigger(this.data);
          localStorage.setItem('companies', JSON.stringify(this.data));
        }
      }.bind(this));
  },

  getInitialState: function() {
    return this.data;
  }

});

module.exports = companyStore;
