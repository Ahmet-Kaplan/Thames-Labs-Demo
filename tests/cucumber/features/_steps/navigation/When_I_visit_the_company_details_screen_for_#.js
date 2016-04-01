module.exports = function() {
  this.When(/^I visit the company details screen for "([^"]*)"$/, function (name) {
    // Write the automation code here
    browser.click('a#menuLinkCompanies');
    browser.click('h4.list-group-item-heading=' + name);
  });
};
