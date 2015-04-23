var Reflux = require('reflux');
var request = require('superagent');

var auth = require('../auth');
var actions = require('../actions/actions');

var store = Reflux.createStore({

    listenables: actions,

    init: function() {
      this.data = [{"Company": "test", "CompanyID": "1"}];
    },

    onCompanyListUpdate: function() {
      request
        .get('/api/1.0/company/')
        .set('x-tkn', auth.getToken())
        .end(function(res) {
          if (res.unauthorized) {
            return console.log('unauthorised');
          }
          this.data = res.body;
          this.trigger(this.data);
        }.bind(this));
    },

    getInitialState: function() {
      return this.data;
    }

});

module.exports = store;
