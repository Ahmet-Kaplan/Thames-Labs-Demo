var Amygdala = require('amygdala');

var store = new Amygdala({
  'config': {
    'apiUrl': 'http://192.168.251.44:443',
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
