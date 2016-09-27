module.exports = function() {

  this.When(/^I go to the ([^"]*) settings$/, function(section) {
    browser.safeClick('a#general-dropdown');
    browser.safeClick('a#settings');
    browser.safeClick(`a#${section}-link`);
  });
};
