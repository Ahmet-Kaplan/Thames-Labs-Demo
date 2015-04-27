var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

var defaultUser = {
  id: null,
  token: null,
  loggedIn: false
};

var userStore = Reflux.createStore({

  listenables: actions,

  init: function() {
    this.data = defaultUser;
    var cache = localStorage.getItem('user');
    if (cache) { this.data = JSON.parse(cache); }
  },

  getInitialState: function() {
    return this.data;
  },

  onLogin: function(username, password) {
    request
      .post('/api/1.0/login')
      .type('form')
      .send({
        uid: username,
        pwd: password
      })
      .end(function(err, res){
        if (res.status === 200) {
          this.data.id = res.body.userId;
          this.data.token = res.body.token;
          this.data.loggedIn = true;
          localStorage.setItem('user', JSON.stringify(this.data));
        }
        this.trigger(this.data);
      }.bind(this));
  },

  onLogout: function() {
    this.data = defaultUser;
    delete localStorage.user;
    this.trigger(this.data);
  },

  getToken: function() {
    return this.data.token;
  },

  loggedIn: function() {
    return this.data.loggedIn;
  }

});

module.exports = userStore;
