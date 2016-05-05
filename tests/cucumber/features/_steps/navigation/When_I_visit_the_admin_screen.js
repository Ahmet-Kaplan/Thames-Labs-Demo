module.exports = function() {

  this.When(/^I visit the admin screen$/, function() {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#Administration');
  });

}
