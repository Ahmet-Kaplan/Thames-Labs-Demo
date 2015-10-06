module.exports = function() {

  this.When(/^I search for Cowley Road$/, function() {
    client.waitForVisible('#geo', 2000);
    client.execute(function() {
      var y = $(".modal").height();
      $(".modal").scrollTop(y);
    })
    client.setValue('#geo', 'Cowley Road, Cambridge');
    client.waitForVisible('.pac-item');
    client.click('.pac-item');
  });

  this.Then(/^I should see a map$/, function() {
    client.waitForVisible('.gm-style', 2000);
    client.waitForVisible('.gm-style-mtc', 2000);
  });

};
