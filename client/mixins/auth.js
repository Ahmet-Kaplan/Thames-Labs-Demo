var userStore = require('../stores/userStore');

var auth = {
  statics: {
    willTransitionTo: function(transition){
      var nextPath = transition.path;
      if (!userStore.loggedIn()) {
        transition.redirect('/login', {}, {'nextPath': nextPath});
      }
    }
  }
};

module.exports = auth;
