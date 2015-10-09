module.exports = function() {

  this.When(/^I search for Cowley Road$/, function() {
    client.waitForExist('#geo', 2000);
    client.execute(function() {
      var y = $(".modal").height();
      $(".modal").scrollTop(y);
    })
    client.setValue('#geo', 'Cowley Road, Cambridge');
    client.waitForExist('.pac-item');
    client.click('.pac-item');
  });

  this.Then(/^I should see a map$/, function() {
    client.waitForExist('.gm-style', 2000);
    client.waitForExist('.gm-style-mtc', 2000);
  });

};
