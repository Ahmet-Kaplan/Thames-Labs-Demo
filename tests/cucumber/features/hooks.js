module.exports = function( ) {

  // called before each scenario
  this.Before(function() {
    client.setViewportSize({
      width: 1000,
      height: 750
    });
    client.url(process.env.ROOT_URL);
    client
      .executeAsync(function(done) {
        Meteor.call('reset', done);
      });
  });

};
