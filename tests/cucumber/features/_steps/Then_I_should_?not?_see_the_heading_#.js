module.exports = function() {
  this.Then(/^I should (not )?see the heading "([^"]*)"$/, function(negate, expectedHeading) {
    if (!negate){
      browser.waitForExist('h1*=' + expectedHeading, 5000);
    }else {
      browser.waitForExist('h1*=' + expectedHeading, 5000, true);
    }
  });
}
