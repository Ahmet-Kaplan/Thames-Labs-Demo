module.exports = function() {
  this.When(/^I visit the company details screen for "([^"]*)"$/, function(name) {
    browser.safeClick('a#menu-link-companies');
    browser.safeClick('h4.list-group-item-heading=' + name);
  });
};
