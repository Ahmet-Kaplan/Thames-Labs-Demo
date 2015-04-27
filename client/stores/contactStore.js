var Reflux = require('reflux');
var request = require('superagent');

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
  }

});

module.exports = contactStore;
