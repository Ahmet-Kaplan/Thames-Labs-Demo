var Amygdala = require('amygdala');
var os = require('os');
var config = require('../server/config');

var store = new Amygdala({
  'config': {
    'apiUrl': 'https://' + os.hostname() + ':' + config.port + '/api/1.0/',
    'idAttribute': 'url',
    'localStorage': true,
    'headers': {
      'x-tkn': '',
    },
  },
  'schema': {
    'users': {
      'url': 'users/'
    },
    'company': {
      'url': 'company/'
    }
  }
});

module.exports = store;
