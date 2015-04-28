var Reflux = require('reflux');
var request = require('superagent');
var _ = require('underscore');

var actions = require('../actions/actions');
var userStore = require('../stores/userStore');

var contactStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.data = [];
    var cache = localStorage.getItem('contacts');
    if (cache) { this.data = JSON.parse(cache); }
  },

  getInitialState: function() {
    return this.data;
  },

  onContactListUpdate: function() {
    request
      .get('/api/1.0/contact/')
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        }
        this.data = res.body;
        this.trigger(this.data);
        localStorage.setItem('contacts', JSON.stringify(this.data));
      }.bind(this));
  },

  onContactUpdate: function(contactId) {
    request
      .get('/api/1.0/contact/' + contactId)
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        } else {
          this.data = _.reject(this.data, function(contact) {
            return contact.ContactID === contactId;
          });
          this.data.push(res.body);
          this.trigger(this.data);
          localStorage.setItem('contacts', JSON.stringify(this.data));
        }
      }.bind(this));
  },

  onContactUpdateByCompanyId: function(companyId) {
    request
      .get('/api/1.0/company/' + companyId + '/contact')
      .set('x-tkn', userStore.getToken())
      .end(function(res) {
        if (res.unauthorized) {
          actions.logout();
        } else {
          this.data = _.reject(this.data, function(contact) {
            return contact.CompanyID === companyId;
          });
          this.data = this.data.concat(res.body);
          this.trigger(this.data);
          localStorage.setItem('contacts', JSON.stringify(this.data));
        }
      }.bind(this));
  }

});

module.exports = contactStore;
