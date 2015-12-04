module.exports = function( ) {

  // called before each scenario
  this.Before(function() {
    browser.setViewportSize({
      width: 1200,
      height: 700
    });
    browser.url(process.env.ROOT_URL);
    server.call('reset');
  });

};
