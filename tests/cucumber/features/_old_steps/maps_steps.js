module.exports = function() {

  this.When(/^I search for Cowley Road$/, function() {
    browser.waitForExist('#geo', 10000);
    browser.waitForVisible('#geo', 10000);
    browser.execute(function() {
      var y = $(".modal").height();
      $(".modal").scrollTop(y);
    });
    browser.setValue('#geo', 'Cowley Road, Cambridge');
    browser.waitForExist('.pac-item');
    browser.click('.pac-item');
  });

  this.Then(/^I should see a map$/, function() {
    browser.waitForExist('.gm-style', 5000);
    browser.waitForExist('.gm-style-mtc', 5000);
  });

};
