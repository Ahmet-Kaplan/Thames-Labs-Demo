module.exports = function( ) {

  // called before each scenario
  this.Before(function(event, callback) {
    this.client.setViewportSize({
      width: 1000,
      height: 750
    })
    this.server.call('reset', callback);
  });

};
