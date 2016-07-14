module.exports = function() {

  this.When(/^I go to the admin screen$/, function() {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
  });
};
