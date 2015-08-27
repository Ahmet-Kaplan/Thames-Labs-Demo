module.exports = function( ) {

  // called before each scenario
  this.Before(function(event, callback) {
    this.server.call('reset', callback);
  });

};
