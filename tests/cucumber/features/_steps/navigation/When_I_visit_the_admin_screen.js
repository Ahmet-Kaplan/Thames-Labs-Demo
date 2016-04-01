module.exports = function() {

  this.When(/^I visit the admin screen$/, function() {
    browser.click('a#general-dropdown');
    browser.click('a#Administration');
  });

}
