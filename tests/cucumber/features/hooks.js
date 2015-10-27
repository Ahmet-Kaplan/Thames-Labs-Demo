module.exports = function( ) {

  // called before each scenario
  this.Before(function() {
    browser.setViewportSize({
      width: 1000,
      height: 750
    });
    browser.url(process.env.ROOT_URL);
    browser
      .executeAsync(function(done) {
        Meteor.call('reset', done);
      });
  });

};
