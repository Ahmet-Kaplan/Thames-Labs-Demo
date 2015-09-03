module.exports = function() {

  this.When(/^I search for Cowley Road$/, function(callback) {
    this.client
    .waitForVisible('#geo', 2000)
    .execute(function() {
      var y = $(".modal").height();
      console.log(y);
      $(".modal").scrollTop(y);
    })
    .setValue('#geo', 'Cowley Road, Cambridge')
    .waitForVisible('.pac-item')
    .click('.pac-item')
    .call(callback);
  });

  this.Then(/^I should see a map$/, function(callback) {
    this.client
      .waitForVisible('.gm-style', 2000)
      .waitForVisible('.gm-style-mtc', 2000)
      .call(callback);
  });

};
