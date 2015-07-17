module.exports = function( ) {

  // called before each scenario
  // analogous to a router onBeforeAction
  this.Before(function(event, callback) {
    this.server.call('reset', callback);
  });

};
