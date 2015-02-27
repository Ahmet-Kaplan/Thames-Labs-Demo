var Amygdala = require('amygdala');
var os = require('os');
var config = require('../config');

var store = new Amygdala({
  'config': {
    'apiUrl': 'https://' + os.hostname() + ':' + config.port,
    'idAttribute': 'url',
    'localStorage': true
  },
  'schema': {
    'users': {
      'url': '/users/'
    },
    'company': {
      'url': '/company/'
    }
  }
});

module.exports = store;
