module.exports = function() {

  // called before each scenario
  // analogous to a router onBeforeAction
  this.Before('@foo', function(event, callback) {
    // this.server.call('reset', callback);
    // do things
  });

  this.registerHandler('BeforeScenario', function(event, callback) {
    // var scenario = event.getPayloadItem('scenario');
    // console.info("\n[" + (scenario.getName()) + "](" + (scenario.getUri()) + ":" + (scenario.getLine()) + ")");
    // callback();

    this.server.call('reset', callback);
  });

};
