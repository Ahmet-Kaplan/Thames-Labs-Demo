var request = require('superagent');

var auth = {

  login: function(username, password, cb) {
    request
      .post('/api/1.0/login')
      .type('form')
      .send({
        uid: username,
        pwd: password
      })
      .end(function(err, res){
        if (res.status === 200) {
          localStorage.token = res.text;
          if (cb) cb(true);
        } else {
          if (cb) cb(false);
        }
      });
  },

  logout: function(cb) {
    delete localStorage.token;
    if (cb) cb();
  },

  loggedIn: function() {
    return !!localStorage.token;
  },

  getToken: function() {
    return localStorage.token;
  },

  mixin: {
    statics: {
      willTransitionTo: function(transition){
        var nextPath = transition.path;
        if (!auth.loggedIn()) {
          transition.redirect('/login', {}, {'nextPath': nextPath});
        }
      }
    }
  }

};

module.exports = auth;
