var Reflux = require('reflux');
var request = require('superagent');
var _ = require('underscore');

var actions = require('../actions/actions');
var userStore = require('../stores/userStore');

var activityStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.data = [];
    var cache = localStorage.getItem('activities');
    if (cache) { this.data = JSON.parse(cache); }
  },

  getInitialState: function() {
    return this.data;
  },

  onActivityUpdateByCompanyId: function(companyId) {
    request
      .get('/api/1.0/company/' + companyId + '/activity')
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        } else {
          this.data = _.reject(this.data, function(activity) {
            return activity.CompanyID === companyId;
          });
          this.data = this.data.concat(res.body);
          this.trigger(this.data);
          localStorage.setItem('activities', JSON.stringify(this.data));
        }
      }.bind(this));
  },

  onActivityUpdateByContactId: function(contactId) {
    request
    .get('/api/1.0/contact/' + contactId + '/activity')
    .set('x-tkn', userStore.getToken())
    .end(function(res) {
      if (res.unauthorized) {
        actions.logout();
      } else {
        this.data = _.reject(this.data, function(activity) {
          return activity.ContactID === contactId;
        });
        this.data = this.data.concat(res.body);
        this.trigger(this.data);
        localStorage.setItem('activities', JSON.stringify(this.data));
      }
    }.bind(this));
  }

});

module.exports = activityStore;
